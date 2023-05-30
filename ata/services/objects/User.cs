using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class User
    {
        public int Id { get; set; }
        public string Name{ get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }

        public User(){}
    }
}