﻿using System;
using System.Collections.Generic;
using System.Text;

namespace GeoPing.Utilities.EmailSender.Models
{
    class ConfirmationEmail
    {
        private string _userName { get; set; }
        private string _link { get; set; }

        public ConfirmationEmail(string username, string link)
        {
            _userName = username;
            _link = link;
        }

        public string GetMail()
        {
            string mail = $"Greetings {_userName}, \n" + "We have received your request to create an " +
                          $"account on Geoping.info with the name {_userName} on {DateTime.UtcNow.ToLongDateString()}.\n" +
                          "Before the account creation process can be finalized we need to verify your email address. " +
                          $"You can do that by clicking <a href='{_link}'>here</a> or the link below.\n " +
                          $"{_link} \n" +
                          "This link is valid for 24 hours. \n" +
                          "If this request was not made by you please disregard this email.The account creation will not be " +
                          "finalized unless you click the link above. \n" +
                          "Geoping Team \n" +
                          "www.geoping.info";

            return mail;
        }
    }
}