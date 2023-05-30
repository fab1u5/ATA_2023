using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class Penalties
    {
        public int Id { get; set; }
        public int Documents { get; set; }
        public int LackOfSEF { get; set; }
        public int DriverMeetingAttendance { get; set; }
        public int DriverPenalties { get; set; }
        public int PostEnduranceScrutineering { get; set; }
        public int TotalPenalties {get; set;}
        public virtual Car car { get; set; }
        public string PenaltiesNotes { get; set; }
        public Penalties()
        {
        }

    }
}