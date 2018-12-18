using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Models.Entities;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace GeoPing.Services
{
    public class PublicService : IPublicService
    {
        private Dictionary<string, Expression<Func<PublicListDTO, object>>> _orderBys =
            new Dictionary<string, Expression<Func<PublicListDTO, object>>>
            {
                {"name", x => x.Name},
                {"author", x => x.OwnerName},
                {"dateCreated", x => x.CreateDate},
                {"dateEdited", x => x.EditDate},
                {"datePublished", x => x.PublishDate},
                {"rating", x => x.Rating},
                {"subscribers", x => x.SubscribersNumber},
                {"finishers", x => x.FinishersNumber},
                {"isOfficial", x => x.IsOfficial}
            };

        private IGeolistService _geolistSrv;
        private IGeopointService _geopointSrv;
        private IGeopingUserService _userSrv;
        private IRepository<PublicList> _publicListRepo;
        private ILogger<PublicService> _logger;

        public PublicService
            (IGeolistService geolistSrv,
            IGeopointService geopointSrv,
            IGeopingUserService userSrv,
            IRepository<PublicList> publicListRepo,
            ILogger<PublicService> logger)
        {
            _geolistSrv = geolistSrv;
            _geopointSrv = geopointSrv;
            _userSrv = userSrv;
            _publicListRepo = publicListRepo;
            _logger = logger;
        }

        public WebResult<IEnumerable<PublicListDTO>> GetByFilter(PublicGeolistFilterDTO filter)
        {
            _logger.LogDebug($"Getting public geolists by filter.");

            var data = _geolistSrv.FilterListsByFilter(_geolistSrv.Get(x => x.IsPublic), filter);

            var result = GetPublicListDTO(data);

            result = FilterListsByFilter(result, filter);

            var totalItems = result.Count();

            result = PaginateByFilter(result, filter);

            _logger.LogDebug($"Public geolists were successfully gotten by filter.");

            return new WebResult<IEnumerable<PublicListDTO>>
            {
                Data = result,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public WebResult<IEnumerable<PublicListDTO>> GetByFilter(Guid ownerId, PublicGeolistFilterDTO filter)
        {
            _logger.LogDebug($"Getting public geolists by filter are owned by user.");

            var data = _geolistSrv.FilterListsByFilter
                (_geolistSrv.Get(x => x.IsPublic && x.OwnerId == ownerId), filter);

            var result = GetPublicListDTO(data);

            result = FilterListsByFilter(result, filter);

            var totalItems = result.Count();

            result = PaginateByFilter(result, filter);
            
            return new WebResult<IEnumerable<PublicListDTO>>
            {
                Data = result,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems
            };
        }

        public PublicListDTO GetPublicList(Guid listId)
        {
            var data = _geolistSrv.Get(x => x.Id == listId && x.IsPublic);

            return GetPublicListDTO(data).FirstOrDefault();
        }

        public IEnumerable<GeoPoint> GetPointsOfPublicList(Guid listId)
        {
            return _geopointSrv.Get(x => x.ListId == listId);
        }

        public GeoPoint GetPointOfPublicList(Guid listId, Guid pointId)
        {
            return _geopointSrv.Get(x => x.ListId == listId && x.Id == pointId).FirstOrDefault();
        }

        public bool DoesPublicListExist(Guid listId)
        {
            return _geolistSrv.Get(x => x.IsPublic && x.Id == listId).Any();
        }

        private IQueryable<PublicListDTO> GetPublicListDTO(IQueryable<GeoList> data)
        {
            var owners = _userSrv.GetUsers(u => data.Any(gl => gl.OwnerId == u.Id));

            var result =
                from gl in data
                from pl in _publicListRepo.Get()
                from u in owners
                where gl.Id == pl.ListId && 
                      gl.OwnerId == u.Id
                select new PublicListDTO
                {
                    Id = gl.Id,
                    Name = gl.Name,
                    Description = gl.Description,
                    OwnerId = u.Id,
                    OwnerName = u.Login,
                    CreateDate = gl.Created.ToUniversalTime(),
                    EditDate = gl.Edited.ToUniversalTime(),
                    PublishDate = pl.PublishDate.ToUniversalTime(),
                    Rating = pl.Rating,
                    SubscribersNumber = pl.SubscribersNumber,
                    FinishersNumber = pl.FinishersNumber,
                    IsOfficial = pl.IsOfficial
                };

            return result;
        }

        private IQueryable<PublicListDTO> FilterListsByFilter
            (IQueryable<PublicListDTO> data, PublicGeolistFilterDTO filter)
        {
            if (filter.IsOfficial != null)
            {
                data = data.Where(x => x.IsOfficial == filter.IsOfficial);
            }

            var isPublishedFrom = DateTime.TryParse(filter.DatePublishFrom, out var publishedFrom);
            var isPublishedTo = DateTime.TryParse(filter.DatePublishTo, out var publishedTo);

            // Filtering by publish date
            data = isPublishedFrom
                 ? data.Where(x => x.PublishDate >= publishedFrom)
                 : data;

            data = isPublishedTo
                 ? data.Where(x => x.PublishDate <= publishedTo)
                 : data;

            // Filtering by author name
            data = !string.IsNullOrEmpty(filter.Author)
                     ? data.Where(x => x.OwnerName.Contains(filter.Author))
                     : data;

            // Filtering by rating
            data = filter.RatingFrom != null
                 ? data.Where(x => x.Rating >= filter.RatingFrom)
                 : data;

            data = filter.RatingTo != null
                 ? data.Where(x => x.Rating <= filter.RatingTo)
                 : data;

            // Filtering by subscribers number 
            data = filter.SubsFrom != null
                 ? data.Where(x => x.SubscribersNumber >= filter.SubsFrom)
                 : data;

            data = filter.SubsTo != null
                 ? data.Where(x => x.SubscribersNumber <= filter.SubsTo)
                 : data;

            // Filtering by finishers number 
            data = filter.FinishersFrom != null
                 ? data.Where(x => x.FinishersNumber >= filter.FinishersFrom)
                 : data;

            data = filter.FinishersTo != null
                 ? data.Where(x => x.FinishersNumber <= filter.FinishersTo)
                 : data;

            return data;
        }

        private IQueryable<PublicListDTO> PaginateByFilter
            (IQueryable<PublicListDTO> data, StandartFilterDTO filter)
        {
            filter.PageNumber = filter.PageNumber ?? 0;

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && _orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = _orderBys[filter.OrderBy];

                data = filter.IsDesc
                    ? data.OrderByDescending(orderExpression)
                    : data.OrderBy(orderExpression);
            }

            if (filter.PageSize != null)
            {
                data = data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return data;
        }
    }
}
