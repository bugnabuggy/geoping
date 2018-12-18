using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    public class PublicGeolistController: Controller
    {
        private IGeolistService _geolistSrv;
        private IClaimsHelper _helper;
        private ISecurityService _securitySrv;

        public PublicGeolistController
            (IGeolistService geolistSrv,
            IClaimsHelper helper,
            ISecurityService securitySrv)
        {
            _geolistSrv = geolistSrv;
            _helper = helper;
            _securitySrv = securitySrv;
        }


    }
}
