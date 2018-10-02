using GeoPing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GeoPing.Api.Interfaces
{
    public interface IDataService<T>
    {
        IQueryable<T> Get();
        IQueryable<T> Get(Expression<Func<T, bool>> func);

        OperationResult<T> Add(T item);
        OperationResult<T> Update(T item);
        OperationResult<T> Delete(T item);
    }
}
