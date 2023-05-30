using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreDesign
    {
       public int Id { get; set; }

        public double Suspension { get; set; }
        public double FrameBodyAero { get; set; }
        public double CockpitControlsBrakesSafety { get; set; }
        public double SystemManagementIntegration { get; set; }
        public double ManufacturabilityServiceability { get; set; }
        public double AestheticsStyle { get; set; }
        public double Creativity { get; set; }
        public double CarWeight { get; set; }

        public string SuspensionNotes { get; set; }
        public string FrameBodyAeroNotes { get; set; }
        public string CockpitControlsBrakesSafetyNotes { get; set; }
        public string SystemManagementIntegrationNotes { get; set; }
        public string ManufacturabilityServiceabilityNotes { get; set; }
        public string AestheticsStyleNotes { get; set; }
        public string CreativityNotes { get; set; }
        public double Miscellaneous { get; set; }
        public string MiscellaneousNotes { get; set; }

        public virtual Score Score{ get; set; }

        public ScoreDesign() { }
    }
}