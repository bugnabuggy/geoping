using GeoPing.Api.Interfaces;
using GeoPing.Api.Models;
using GeoPing.Api.Models.DTO;
using GeoPing.Api.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Api.Services
{
    public class GeolistService : IGeolistService
    {
        private Dictionary<string, Expression<Func<GeoList, object>>> orderBys =
            new Dictionary<string, Expression<Func<GeoList, object>>>()
        {
            {"name", x => x.Name},
            {"periodFrom", x => x.PeriodFrom},
            {"periodTo", x => x.PeriodTo},
            {"rating", x => x.Rating},
            {"subscribers", x => x.SubscribersNumber}
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
            var isPeriodFrom = DateTime.TryParse(filter.PeriodFrom, out DateTime periodFrom);
            var isPeriodTo = DateTime.TryParse(filter.PeriodFrom, out DateTime periodTo);


            // Filtering by public status. There is no filtering if isPublic field in filter is null
            if (filter.isPublic != null)
            {
                data = data.Where(x => x.IsPublic == filter.isPublic);
            }

            // Filtering by name
            data = !string.IsNullOrEmpty(filter.NameContains)
                 ? data.Where(x => x.Name.Contains(filter.NameContains))
                 : data;

            // Filtering by owner
            data = !string.IsNullOrEmpty(filter.OwnerId)
                 ? data.Where(x => x.OwnerId.Equals(filter.OwnerId))
                 : data;

            // Filtering by rating
            data = filter.RatingFrom != null
                 ? data.Where(x => x.Rating >= filter.RatingFrom)
                 : data;

            data = filter.RatingTo != null
                 ? data.Where(x => x.Rating <= filter.RatingTo)
                 : data;
            
            // filtering by subs number
            data = filter.SubsNumberFrom != null
                 ? data.Where(x => x.SubscribersNumber >= filter.SubsNumberFrom)
                 : data;

            data = filter.SubsNumberTo != null
                 ? data.Where(x => x.SubscribersNumber <= filter.SubsNumberTo)
                 : data;

            // Filtering by period
            data = isPeriodFrom
                 ? data.Where(x => x.PeriodFrom >= periodFrom)
                 : data;

            data = isPeriodTo
                 ? data.Where(x => x.PeriodTo <= periodTo)
                 : data;

            filter.PageNumber = filter.PageNumber ?? 0;

            totalItems = data.Count();

            if (!string.IsNullOrWhiteSpace(filter.OrderBy) && orderBys.ContainsKey(filter.OrderBy))
            {
                var orderExpression = orderBys[filter.OrderBy];

                if(filter.IsDesc)
                {
                    data.OrderByDescending(orderExpression);
                }
                else
                {
                    data.OrderBy(orderExpression);
                }
            }

            if(filter.PageSize != null)
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
