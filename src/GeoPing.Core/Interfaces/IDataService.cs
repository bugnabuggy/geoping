﻿using System;
using System.Linq;
using System.Linq.Expressions;
using GeoPing.Core.Models;

namespace GeoPing.Core.Interfaces
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
