using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreAutoCross : ScoreDynamic
    {
        public int Run1Doc { get; set; }
        public int Run2Doc { get; set; }
        public int Run3Doc { get; set; }
        public int Run4Doc { get; set; }
        public ScoreAutoCross() { }

        private double CalculateAdjTime(double time, int cones, int DOC){
            //How to calculate AdjTime
            //=IF(R6<>0;R6+S6*2+T6*20;"DNA")
            //R6 : Time
            //S6 : Cones
            //T6 : DOC

            if (time != 0)
            {
                //FDT - ATA 2023 - modifiche formula - INIZIO
                //return time + (cones * 2) + (DOC * 20);
                return time + (cones * 2) + (DOC * 10);
                //FDT - ATA 2023 - modifiche formula - FINE
            }
            else
            {
                return -1;
            }
        }

        public void CalculateAdjTimes() {
            this.Run1TimeAdj = CalculateAdjTime(this.Run1Time, this.Run1NumOfCones, this.Run1Doc);
            this.Run2TimeAdj = CalculateAdjTime(this.Run2Time, this.Run2NumOfCones, this.Run2Doc);
            this.Run3TimeAdj = CalculateAdjTime(this.Run3Time, this.Run3NumOfCones, this.Run3Doc);
            this.Run4TimeAdj = CalculateAdjTime(this.Run4Time, this.Run4NumOfCones, this.Run4Doc);
        }
    }
}