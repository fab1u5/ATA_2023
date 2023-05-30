using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATA.services
{
    public class Event
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual EventName EventName { get; set; }
        public virtual EventType EventType { get; set; }
        public bool IsScoreNumeric { get; set; }
        public double MaximumScore { get; set; }

        [NotMapped]
        public bool ReadOnly { get; set; }

        public Event() {}
    }
}