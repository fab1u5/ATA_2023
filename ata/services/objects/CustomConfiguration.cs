using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATA.services
{
    public class CustomExamBoardToExaminer {
        public int ExamBoardId { get; set; }
        public int ExaminerId { get; set; }

        public CustomExamBoardToExaminer() { }
    }

    public class CustomExamBoardToCar
    {
        public int ExamBoardId { get; set; }
        public int CarId { get; set; }

        public CustomExamBoardToCar() { }
    }

    public class CustomEvent {
        public int Id { get; set; }
        public string Description { get; set; }
        public int EventNameId { get; set; }
        public int EventTypeId{ get; set; }
        public bool IsScoreNumeric { get; set; }
        public double MaximumScore { get; set; }
    }
    
    public class CustomConfiguration
    {
        public int ExamBoardId { get; set; }

        public virtual List<Fuel> Fuels { get; set; }
        public virtual List<Class> Classes { get; set; }

        public virtual List<Team> Teams { get; set; }

        public virtual List<Examiner> Examiners { get; set; }

        public virtual List<CustomExamBoardToExaminer> ExamBoardToExaminers { get; set; }
        public virtual List<CustomExamBoardToCar> ExamBoardToCars { get; set; }

        public virtual List<Car> Cars { get; set; }

        public virtual ExamBoard ExamBoard { get; set; }

        public virtual List<EventType> EventTypes{ get; set; }

        public virtual List<EventName> EventNames { get; set; }
        public virtual List<CustomEvent> Events { get; set; }

        public CustomConfiguration() {
            this.Fuels = new List<Fuel>();
            this.Classes = new List<Class>();
            this.Teams = new List<Team>();
            this.Examiners = new List<Examiner>();
            this.ExamBoardToExaminers = new List<CustomExamBoardToExaminer>();
            this.ExamBoardToCars = new List<CustomExamBoardToCar>();
            this.Cars = new List<Car>();
            this.ExamBoard = new ExamBoard();
            this.EventTypes = new List<EventType>();
            this.EventNames = new List<EventName>();
            this.Events = new List<CustomEvent>();
        }


        public bool Load(int examboardId) {

            this.ExamBoardId = examboardId;
            try
            {
                ATA_Context context = new ATA_Context();
                context.Configuration.LazyLoadingEnabled = false;

                //Get Fuels
                this.Fuels = context.Fuels.ToList();
                //Get Classes
                this.Classes = context.Classes.ToList();

                //Load ExamBoard detail
                //AF - Giu 2016 - Examboard is connected to a single Event
                ExamBoard examboardToSerialize = context.ExamBoards.Include("Examiners").Include("Cars").Include("Event").Where(e => e.Id.Equals(this.ExamBoardId)).FirstOrDefault();

                //Load Examiners and relations
                List<Examiner> examinersToSerialize = new List<Examiner>();
                foreach (Examiner e in examboardToSerialize.Examiners) {
                    //Load Examiners related to
                    Examiner examinerToSerialize = new Examiner();
                    examinerToSerialize.Id = e.Id;
                    examinerToSerialize.FirstName = e.FirstName;
                    examinerToSerialize.Surname = e.Surname;
                    examinerToSerialize.Phone = e.Phone;
                    this.Examiners.Add(examinerToSerialize);

                    //Load ExamBoard/Examiners relations
                    CustomExamBoardToExaminer eTOeToSerialize = new CustomExamBoardToExaminer();
                    eTOeToSerialize.ExamBoardId = this.ExamBoardId;
                    eTOeToSerialize.ExaminerId = e.Id;
                    this.ExamBoardToExaminers.Add(eTOeToSerialize);
                }

                //Load Cars, Teams and relations
                List<Car> carsToSerialize = new List<Car>();
                foreach (Car c in examboardToSerialize.Cars)
                {
                    Car cc = context.Cars.Include("Team").Include("Fuel").Include("Class").Where(ccc => ccc.Id.Equals(c.Id)).FirstOrDefault();

                    //Load Teams
                    Team teamToSerialize = new Team();
                    teamToSerialize.Id = cc.Team.Id;
                    teamToSerialize.Name = cc.Team.Name;
                    teamToSerialize.University = cc.Team.University;
                    teamToSerialize.Country = cc.Team.Country;

                    Team teamToFind = this.Teams.Where(t => t.Id.Equals(teamToSerialize.Id)).FirstOrDefault();
                    if (teamToFind == null)
                        this.Teams.Add(teamToSerialize);

                    //Load Cars and relations
                    Car carToSerialize = new Car();
                    //carToSerialize.AlreadyAssigned = c.AlreadyAssigned;
                    carToSerialize.BoxNo = c.BoxNo;
                    carToSerialize.Carno = c.Carno;
                    carToSerialize.Class = cc.Class;
                    carToSerialize.DeliveryDocDate = c.DeliveryDocDate;
                    carToSerialize.Fuel = cc.Fuel;
                    carToSerialize.Id = c.Id;
                    //carToSerialize.ReadOnly = c.ReadOnly;
                    carToSerialize.Regno = c.Regno;
                    carToSerialize.Team = cc.Team;
                    this.Cars.Add(carToSerialize);

                    //Load ExamBoard/Cars relations
                    CustomExamBoardToCar eTOcToSerialize = new CustomExamBoardToCar();
                    eTOcToSerialize.ExamBoardId = this.ExamBoardId;
                    eTOcToSerialize.CarId = cc.Id;
                    this.ExamBoardToCars.Add(eTOcToSerialize);
                }

                //Get EventTypes
                this.EventTypes = context.EventTypes.ToList();

                //Get EventNames
                List<EventName> eventNamesToSerialize = new List<EventName>();
                eventNamesToSerialize = context.EventNames.Include("EventType").ToList();
                foreach (EventName e in eventNamesToSerialize)
                {
                    EventName eventNameToSerialize = new EventName();
                    eventNameToSerialize.Id = e.Id;
                    eventNameToSerialize.Name = e.Name;
                    eventNameToSerialize.EventType = e.EventType;
                    this.EventNames.Add(eventNameToSerialize);
                }

                //Get Events
                List<Event> eventsToSerialize = new List<Event>();
                eventsToSerialize = context.Events.Include("EventType").Include("EventName").ToList();
                foreach (Event e in eventsToSerialize)
                {
                    CustomEvent eventToSerialize = new CustomEvent();
                    eventToSerialize.Id = e.Id;
                    eventToSerialize.Description = e.Description;

                    eventToSerialize.EventNameId = e.EventName.Id;
                    
                    eventToSerialize.EventTypeId = e.EventType.Id;
                    eventToSerialize.IsScoreNumeric = e.IsScoreNumeric;
                    eventToSerialize.MaximumScore = e.MaximumScore;
                    this.Events.Add(eventToSerialize);
                }


                this.ExamBoard.Color = examboardToSerialize.Color;
                this.ExamBoard.Description=examboardToSerialize.Description;
                this.ExamBoard.Id = examboardToSerialize.Id;
                this.ExamBoard.IsColorUsed = examboardToSerialize.IsColorUsed;
                this.ExamBoard.Name = examboardToSerialize.Name;

                //AF - Giu 2016 - Examboard is connected to a single Event
                //Load Event relation
                Event evtToSerialize = context.Events.Include("EventType").Include("EventName").Where(e => e.Id.Equals(examboardToSerialize.Event.Id)).FirstOrDefault();
                this.ExamBoard.Event = examboardToSerialize.Event;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
            finally
            {
            }
            return true;
        }
    }
}