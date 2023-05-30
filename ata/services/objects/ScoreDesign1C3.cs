using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreDesign1C3: ScoreDesign
    {
        public double Powertrain { get; set; }
        public string PowertrainNotes { get; set; }
        public ScoreDesign1C3() : base() { }

		public double RecalculateTotalScore()
		{
			double givenscore = 0;

			givenscore = this.Suspension
				+ this.FrameBodyAero
				+ this.Powertrain
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