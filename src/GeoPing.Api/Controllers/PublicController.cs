using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoPing.Api.Interfaces;
using GeoPing.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoPing.Api.Controllers
{
    [Route("api/public")]
    public class PublicController: Controller
    {
        private IPublicService _publicSrv;
        private IClaimsHelper _helper;
        private ISecurityService _securitySrv;

        public PublicController
            (IPublicService publicSrv,
            IClaimsHelper helper,
            ISecurityService securitySrv)
        {
            _publicSrv = publicSrv;
            _helper = helper;
            _securitySrv = securitySrv;
        }


    }
}
