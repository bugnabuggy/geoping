using GeoPing.Core.Entities;
using GeoPing.Core.Models;
using GeoPing.Core.Models.DTO;
using GeoPing.Core.Services;
using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Geoping.Services
{
    public class GeolistService : IGeolistService
    {
        private Dictionary<string, Expression<Func<GeoList, object>>> orderBys =
            new Dictionary<string, Expression<Func<GeoList, object>>>()
        {
            {"name", x => x.Name},
            {"dateCreated", x => x.Created},
            {"dateEdited", x => x.Edited},
            {"isPublic", x => x.IsPublic},
        };

        private IRepository<GeoList> _geolistRepo;

        public GeolistService(IRepository<GeoList> geolistRepo)
        {
            _geolistRepo = geolistRepo;
        }

        public IQueryable<GeoList> Get()
        {
            return _geolistRepo.Data;
        }

        public IQueryable<GeoList> Get(Expression<Func<GeoList, bool>> func)
        {
            return _geolistRepo.Data.Where(func);
        }

        public WebResult<IQueryable<GeoList>> GetByFilter(GeolistFilterDTO filter, out int totalItems)
        {
            var data = _geolistRepo.Data;
            var isCreatedFrom = DateTime.TryParse(filter.DateCreatedFrom, out DateTime createdFrom);
            var isCreatedTo = DateTime.TryParse(filter.DateCreatedTo, out DateTime createdTo);
            var isEditedFrom = DateTime.TryParse(filter.DateEditedFrom, out DateTime editedFrom);
            var isEditedTo = DateTime.TryParse(filter.DateEditedTo, out DateTime editedTo);


            // Filtering by public status. There is no filtering if isPublic field in filter is null
            if (filter.IsPublic != null)
            {
                data = data.Where(x => x.IsPublic == filter.IsPublic);
            }

            // Filtering by name
            data = !string.IsNullOrEmpty(filter.NameContains)
                 ? data.Where(x => x.Name.Contains(filter.NameContains))
                 : data;

            // Filtering by owner
            data = filter.OwnerId != Guid.Empty
                 ? data.Where(x => x.OwnerId.Equals(filter.OwnerId))
                 : data;

            // Filtering by creation date
            data = isCreatedFrom
                 ? data.Where(x => x.Created >= createdFrom)
                 : data;

            data = isCreatedTo
                 ? data.Where(x => x.Created <= createdTo)
                 : data;

            // Filtering by editing date
            data = isEditedFrom
                 ? data.Where(x => x.Edited >= editedFrom)
                 : data;

            data = isEditedTo
                 ? data.Where(x => x.Edited <= editedTo)
                 : data;

            filter.PageNumber = filter.PageNumber ?? 0;

            totalItems = data.Count();

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderBys[filter.OrderBy];

                if (filter.IsDesc)
                {
                    data.OrderByDescending(orderExpression);
                }
                else
                {
                    data.OrderBy(orderExpression);
                }
            }

            if (filter.PageSize != null)
            {
                data.Skip((int)filter.PageSize * (int)filter.PageNumber)
                    .Take((int)filter.PageSize);
            }

            return new WebResult<IQueryable<GeoList>>()
            {
                Data = data,
                Success = true,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize,
                TotalItems = totalItems,
            };
        }

        public OperationResult<GeoList> Add(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _geolistRepo.Add(item),
                Messages = new[] { "Geolist was successfully added." },
                Success = true
            };
        }

        public OperationResult<GeoList> Update(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _geolistRepo.Update(item),
                Messages = new[] { "Geolist was successfully edited." },
                Success = true
            };
        }

        public OperationResult<GeoList> Delete(GeoList item)
        {
            return new OperationResult<GeoList>()
            {
                Data = _geolistRepo.Delete(item),
                Messages = new[] { "Geolist was successfully removed." },
                Success = true
            };
        }

    }
}
