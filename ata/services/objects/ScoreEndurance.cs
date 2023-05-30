using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreEndurance
    {
        public int Id { get; set; }

        public double Time { get; set; }

        public int Laps { get; set; }

        public int Penalities { get; set; }

        public int Cone { get; set; }

        public int Doc { get; set; }

        public double AdjTimeDNF { get; set; }

        public double AdjTime { get; set; }

        public double AvgLapTime { get; set; }

        public double AvgLapTimeEfficiency { get; set; }

        public double EnduranceScore { get; set; }

        public double FuelUsed { get; set; }

        public int FuelType { get; set; }

        public double Co2Used { get; set; }

        public double Co2Lap { get; set; }

        public double TminAvg { get; set; }

        public bool DriverChangeStart { get; set; }

        public double EfficencyFactor { get; set; }

        public double EfficienctyScore { get; set; }

        public double TotalScore { get; set; }

        public virtual Score Score { get; set; }
        
        public ScoreEndurance()
        {
        }
        
        public double calculateAdjTimeDNF(double time, int penalities, int cone, int doc)
        {
            double adj = 0;
            if (time != 0)
            {
                adj = time + (double)penalities + (double)cone * 2 + (double)doc * 20;
            }

            return adj;
        }
        public double calculateAdjTime(double time, int laps, int penalities, int cone, int doc, double totLaps)
        {
            if (laps >= totLaps)
                return time + penalities + cone * 2 + doc * 20;
            else
                return 0;
        }

        public double calculateAvgLapTime(double adj, double laps)
        {
            if (adj > 0 && laps > 0)
                return adj / laps;
            else
                return 0;
        }

        public double calcAvgLapTimeEfficiency(double adjDNF, double laps)
        {
            if (adjDNF > 0 && laps > 0)
                return adjDNF / laps;
            else return 0;
        }

        //Event 2017 - Update formulas
        //public double calcEnduranceScore(double adj, double maxTime, double minTime)
        //{
        //    if (adj > 1)
        //    {
        //        return 250 * (maxTime / adj - 1) / (maxTime / minTime - 1) + 50;
        //    }
        //    else return 0;
        //}
        public double calcEnduranceScore(double adj, double maxTime, double minTime, int laps)
        {
            //laps < totLaps, see calculateAdjTime function - race not completed, number of performed laps returned
            if (adj == 0)
                return laps;

            //Too long, return 25 (default value)
            if (adj > maxTime)
                return 25;

            if (adj > 1)
            {
                return 250 * (maxTime / adj - 1) / (maxTime / minTime - 1) + 25;
            }
            else return laps;
        }

        public double calcCo2Lap(double laps, double fuelUsed, double avgLapTimeForEfficency, double maxLapTime, double AvgLapTime, double Co2used)
        {
            if (laps > 0 && fuelUsed > 0)
            {
                if (avgLapTimeForEfficency < maxLapTime)
                {
                    return Co2Used / laps;
                }
                else return 0;
            }
            else return 0;

        }


    }
}