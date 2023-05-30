using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreDesign1E : ScoreDesign
    {
        public double TractiveDriveRecoverySystem { get; set; }
        public string TractiveDriveRecoverySystemNotes { get; set; }
        public ScoreDesign1E() : base() { }

		public double RecalculateTotalScore()
		{
			double givenscore = 0;

			givenscore = this.Suspension
				+ this.FrameBodyAero
				+ this.TractiveDriveRecoverySystem
				+ this.CockpitControlsBrakesSafety
				+ this.SystemManagementIntegration
				+ this.ManufacturabilityServiceability
				+ this.AestheticsStyle
				+ this.Creativity
				+ this.Miscellaneous;

			return givenscore;
		}
	}
}