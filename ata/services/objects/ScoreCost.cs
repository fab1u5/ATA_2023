using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ScoreCost
    {
        public int Id { get; set; }
        public double CostBeforeAddendum { get; set; }
        public double AddendumAdjustment { get; set; }
        public double Cost { get; set; }
        public double CostPoint { get; set; }
        public double VisualInspection { get; set; }
        public double VisualInspectionPoint { get; set; }
        public double EventDay { get; set; }
        public double EventDayPoint { get; set; }
        public double Penalities { get; set; }
        public double DelayPenalities { get; set; }
        public double ScoreNotWiegjted { get; set; }
        public double ScoreValue { get; set; }
        public virtual Score Score { get; set; }
        public string Notes { get; set; }

    }
}