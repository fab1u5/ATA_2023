using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class Score
    {
        public int Id {get; set;}
        public virtual Event Event { get; set; }
        public virtual Car Car { get; set; }
        public double GivenScore { get; set; }

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		public double FinalsScore { get; set; }

        public double PenalityScore { get; set; }
        public string PenalityNotes { get; set; }
        public double CorrectedScore { get; set; }
        //Event 2017 - Save also uploading examboard
        public int UploadingExamboard { get; set; }

        public Score(){
            PenalityNotes = string.Empty;
        }
	}
}