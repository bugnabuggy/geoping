using GeoPing.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Infrastructure.Repositories
{
    public class DbRepository<T> : IRepository<T> where T : class
    {
        public IQueryable<T> Data { get; }
        private DbSet<T> _table;
        private ApplicationDbContext _ctx;

        public DbRepository(ApplicationDbContext ctx)
        {
            _ctx = ctx;
            _table = _ctx.Set<T>();
            Data = _table;
        }

        public IQueryable<T> Get()
        {
            IQueryable<T> query = this.Data.AsNoTracking();
            
            return query;
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> filter)
        {
            IQueryable<T> query = this.Data.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return query;
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter = null,
                                                   Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                                                   string includeProperties = "")
        {
            IQueryable<T> query = this.Data;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeProperty in includeProperties.Split
                    (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }

        public T Add(T item)
        {
            _table.Add(item);
            _ctx.SaveChanges();
            return item;
        }

        public IEnumerable<T> Add(IEnumerable<T> items)
        {
            _table.AddRange(items);
            _ctx.SaveChanges();
            return items;
        }

        public async Task<T> AddAsync(T item)
        {
            await _table.AddAsync(item);
            _ctx.SaveChanges();
            return item;
        }

        public async Task<IEnumerable<T>> AddAsync(IEnumerable<T> items)
        {
            await _table.AddRangeAsync(items);
            _ctx.SaveChanges();
            return items;
        }

        public T Delete(T item)
        {
            _table.Remove(item);
            _ctx.SaveChanges();
            return item;
        }

        public IEnumerable<T> Delete(IEnumerable<T> items)
        {
            _table.RemoveRange(items);
            _ctx.SaveChanges();
            return items;
        }

        public T Update(T item)
        {
            _table.Update(item);
            _ctx.SaveChanges();
            return item;
        }

        public IEnumerable<T> Update(IEnumerable<T> items)
        {
            _table.UpdateRange(items);
            _ctx.SaveChanges();
            return items;
        }
    }
}
