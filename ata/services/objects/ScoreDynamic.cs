using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreDynamic
    {
        public int Id { get; set; }

        #region Run#1
        public double Run1Time { get; set; }
        public int Run1NumOfCones { get; set; }

        public double Run1TimeAdj { get; set; }
        #endregion

        #region Run#2
        public double Run2Time { get; set; }
        public int Run2NumOfCones { get; set; }

        public double Run2TimeAdj { get; set; }
        #endregion

        #region Run#3
        public double Run3Time { get; set; }
        public int Run3NumOfCones { get; set; }

        public double Run3TimeAdj { get; set; }
        #endregion
        
        #region Run#4
        public double Run4Time { get; set; }
        public int Run4NumOfCones { get; set; }

        public double Run4TimeAdj { get; set; }
        #endregion
        
        public double BestTime { get; set; }

        public virtual Score Score { get; set; }

        public ScoreDynamic() { }

        public void  CalculateBestTime() {
            //BEST SCORE: 
            /*  IF(
                    MIN(
                        IF(ISNUMBER(ADJ_1);ADJ_1;100)
                        IF(ISNUMBER(ADJ_2);ADJ_2;100)
                        IF(ISNUMBER(ADJ_3);ADJ_3;100)
                        IF(ISNUMBER(ADJ_4);ADJ_4;100)
                    )=100;
                    "DNF";
                    MIN(
                        IF(ISNUMBER(ADJ_1);ADJ_1;100)
                        IF(ISNUMBER(ADJ_2);ADJ_2;100)
                        IF(ISNUMBER(ADJ_3);ADJ_3;100)
                        IF(ISNUMBER(AD_4);ADJ_4;100)
                    )
                )
            */

            List<double> bestAdjTimes = new List<double>();

            bestAdjTimes.Add((this.Run1TimeAdj > 0) ? this.Run1TimeAdj : 100);
            bestAdjTimes.Add((this.Run2TimeAdj > 0) ? this.Run2TimeAdj : 100);
            bestAdjTimes.Add((this.Run3TimeAdj > 0) ? this.Run3TimeAdj : 100);
            bestAdjTimes.Add((this.Run4TimeAdj > 0) ? this.Run4TimeAdj : 100);

            double bestAdjTime = bestAdjTimes.Min();

            if (bestAdjTime == 100)
                //DNF
                this.BestTime = -1;
            else
                this.BestTime = bestAdjTime;
        }
    }
}