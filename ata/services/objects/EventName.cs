using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class EventName
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual EventType EventType { get; set; }

        public EventName(){}
    }
}