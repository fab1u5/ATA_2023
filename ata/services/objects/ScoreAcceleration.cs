using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreAcceleration : ScoreDynamic
    {
        public ScoreAcceleration() { }

        private double CalculateAdjTime(double time, int cones)
        {
            //How to calculate AdjTime
            //=IF(F6<>0;F6+G6*2;"DNA")
            //F6 : Time
            //G6 : Cones

            if (time != 0)
            {
                return time + (cones * 2);
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