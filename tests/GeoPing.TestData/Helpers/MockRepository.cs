using GeoPing.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GeoPing.TestData.Helpers
{
    public class MockRepository<T> : IRepository<T> where T : class
    {
        public IQueryable<T> Data { get; }

        public MockRepository(IEnumerable<T> list)
        {
            Data = list.AsQueryable();
        }

        public T Add(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Add(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }

        public Task<T> AddAsync(T item)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> AddAsync(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }

        public T Delete(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Delete(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, string includePropeties)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, string includeProperties)
        {
            throw new NotImplementedException();
        }

        public T Update(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Update(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }
    }
}
