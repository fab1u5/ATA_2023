using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATA.services
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string University { get; set; }
        public string Country { get; set; }

        [NotMapped]
        public bool ReadOnly { get; set; }

        public Team() {}
    }
}