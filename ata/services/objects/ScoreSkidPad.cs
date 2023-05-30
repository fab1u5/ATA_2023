using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreSkidPad : ScoreDynamic
    {
        public ScoreSkidPad() { }

        private double CalculateAdjTime(double time, int cones){

            if (time != 0)
            {
				//Event 2019 - Was .25
				return time + (cones * 0.125);
            }
            else
            {
                return -1;
            }
        }

        public void CalculateAdjTimes() {
            this.Run1TimeAdj = CalculateAdjTime(this.Run1Time, this.Run1NumOfCones);
            this.Run2TimeAdj = CalculateAdjTime(this.Run2Time, this.Run2NumOfCones);
            this.Run3TimeAdj = CalculateAdjTime(this.Run3Time, this.Run3NumOfCones);
            this.Run4TimeAdj = CalculateAdjTime(this.Run4Time, this.Run4NumOfCones);
        }
    }
}