using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreCost_2015
    {
        public int Id { get; set; }
        public double LowerstCost { get; set; }
        public double Accuracy { get; set; }
        public double EventDay { get; set; }
        public double Presentation { get; set; }
        public double Penalties { get; set; }
        public double TotalAchivedPoints { get; set; }
        public double NormalizedScore { get; set; }
        public virtual Score Score { get; set; }
        public string Notes { get; set; }
    }
}