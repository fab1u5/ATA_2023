using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class ExamBoard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public bool IsColorUsed { get; set; }

        public virtual List<Examiner> Examiners { get; set; }
        public virtual List<Car> Cars { get; set; }
        //AF - Giu 2016 - Examboard is connected to a single Event
        public virtual Event Event { get; set; }


        public ExamBoard(){}
    }
}