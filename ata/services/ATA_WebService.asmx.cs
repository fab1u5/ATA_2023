using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Text;
using System.Data.SqlClient;

namespace ATA.services
{
    /// <summary>
    /// Summary description for ATA_WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]

    public class ATA_WebService : System.Web.Services.WebService
    {

        #region ValidateUser
        [WebMethod(Description = "Validate the login credentials")]
        public bool ValidateUser(string token)
        {
            if (token.Length > 0)
            {
                User user = GetUserByTokenE(token);
                if (user != null)
                {
                    return ((user.ExpiryDate >= DateTime.Now) || (user.ExpiryDate == null));
                }
                else
                    return false;
            }
            else
                return false;
        }

        [WebMethod(Description = "Get Users")]
        public List<User> GetUsers()
        {
            ATA_Context context = new ATA_Context();
            return context.Users.ToList();
        }

        [WebMethod(Description = "Get User by id")]
        public User GetUserById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.Users.Where(u => u.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get User by name")]
        public User GetUserByName(string name)
        {
            ATA_Context context = new ATA_Context();
            return context.Users.Where(u => u.Id.Equals(name)).FirstOrDefault();
        }

        [WebMethod(Description = "Get User by encripted token")]
        public User GetUserByTokenE(string token)
        {
            ATA_Context context = new ATA_Context();
            return context.Users.Where(u => u.Token.Equals(token)).FirstOrDefault();
        }

        [WebMethod(Description = "Get User by decripted token")]
        public User GetUserByTokenD(string token)
        {
            ATA_Context context = new ATA_Context();
            string tokenE = EncodeTo64(token);
            return context.Users.Where(u => u.Token.Equals(tokenE)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert User")]
        public bool InsertUser(string name, string token, DateTime expiryDate)
        {
            try
            {
                if ((name.Length > 0) && (token.Length > 0))
                {
                    ATA_Context context = new ATA_Context();

                    User user = new User();
                    user.Name = name;
                    user.Token = EncodeTo64(token);
                    user.ExpiryDate = expiryDate;

                    context.Users.Add(user);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update User by id")]
        public bool UpdateUser(int id, string name, string token, DateTime expiryDate)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                User user = context.Users.Where(u => u.Id.Equals(id)).FirstOrDefault();

                if ((user != null))
                {
                    user.Name = name;
                    user.Token = EncodeTo64(token);
                    user.ExpiryDate = expiryDate;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete User by id")]
        public bool DeleteUser(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Users.Remove(context.Users.Where(u => u.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        static protected string EncodeTo64(string toEncode)
        {
            byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(toEncode);
            string returnValue = System.Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }
        static protected string DecodeFrom64(string encodedData)
        {
            byte[] encodedDataAsBytes = System.Convert.FromBase64String(encodedData);
            string returnValue = System.Text.ASCIIEncoding.ASCII.GetString(encodedDataAsBytes);
            return returnValue;
        }
        #endregion

        #region Fuels
        [WebMethod(Description = "Get All Fuels")]
        public List<Fuel> GetFuels()
        {
            ATA_Context context = new ATA_Context();
            return context.Fuels.OrderBy(f => f.Name).ToList();
        }

        [WebMethod(Description = "Get Fuel by id")]
        public Fuel GetFuelById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.Fuels.Where(f => f.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Fuel by name")]
        public Fuel GetFuel(string name)
        {
            ATA_Context context = new ATA_Context();
            return context.Fuels.Where(f => f.Name.Equals(name)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert Fuel")]
        public bool InsertFuel(string name)
        {
            try
            {
                if (name.Length > 0)
                {
                    ATA_Context context = new ATA_Context();

                    Fuel fuel = new Fuel();
                    fuel.Name = name;

                    context.Fuels.Add(fuel);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Fuel by id")]
        public bool UpdateFuel(int id, string name)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Fuel fuel = context.Fuels.Where(f => f.Id.Equals(id)).FirstOrDefault();

                if ((fuel != null))
                {
                    fuel.Name = name;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Fuel by id")]
        public bool DeleteFuel(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Fuels.Remove(context.Fuels.Where(f => f.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region Classes
        [WebMethod(Description = "Ges All Classes")]
        public List<Class> GetClasses()
        {
            ATA_Context context = new ATA_Context();
            return context.Classes.ToList();
        }

        [WebMethod(Description = "Get Class by id")]
        public Class GetClassById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.Classes.Where(c => c.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Class by name")]
        public Class GetClass(string name)
        {
            ATA_Context context = new ATA_Context();
            return context.Classes.Where(c => c.Name.Equals(name)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert Class")]
        public bool InsertClass(string name)
        {
            try
            {
                if (name.Length > 0)
                {
                    ATA_Context context = new ATA_Context();

                    Class cls = new Class();
                    cls.Name = name;

                    context.Classes.Add(cls);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Class by id")]
        public bool UpdateClass(int id, string name)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Class cls = context.Classes.Where(c => c.Id.Equals(id)).FirstOrDefault();

                if ((cls != null))
                {
                    cls.Name = name;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Class by id")]
        public bool DeleteClass(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Classes.Remove(context.Classes.Where(c => c.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region Teams
        [WebMethod(Description = "Get All Teams")]
        public List<Team> GetTeams()
        {
            ATA_Context context = new ATA_Context();

            List<Team> teams = context.Teams.OrderBy(t => t.Name).ToList();
            List<Car> cars = context.Cars.ToList();

            foreach (Team t in teams)
            {
                t.ReadOnly = Convert.ToBoolean(cars.Where(c => c.Team.Id.Equals(t.Id)).Count());
            }
            return teams;
        }

        [WebMethod(Description = "Get Team by id")]
        public Team GetTeamById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.Teams.Where(t => t.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Team by teamname, university, country")]
        public Team GetTeam(string name, string university, string country)
        {
            ATA_Context context = new ATA_Context();

            return context.Teams
                .Where(t => t.Name.Equals(name))
                .Where(t => t.University.Equals(university))
                .Where(t => t.Country.Equals(country))
                .FirstOrDefault();
        }

        [WebMethod(Description = "Insert Team")]
        public bool InsertTeam(string name, string university, string country)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                if ((name != null) && (university != null))
                {
                    Team team = new Team();
                    team.Name = name;
                    team.University = university;
                    team.Country = country;

                    context.Teams.Add(team);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Update Team by id")]
        public bool UpdateTeam(int id, string name, string university, string country)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Team team = context.Teams.Where(t => t.Id.Equals(id)).FirstOrDefault();

                if ((team != null) && (name != null) && (university != null))
                {
                    team.Name = name;
                    team.University = university;
                    team.Country = country;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Team by id")]
        public bool DeleteTeam(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Teams.Remove(context.Teams.Where(t => t.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region Cars
        [WebMethod(Description = "Get All Cars")]
        public List<Car> GetCars()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            //Car can be deleted if no score records found - Add reference to scores
            List<Car> cars = context.Cars.Include("Team").Include("Class").Include("Fuel").Include("ExamBoards").Include("Scores").ToList();
            List<Car> carsToSerialize = new List<Car>();
            foreach (Car c in cars)
            {
                Car carToSerialize = new Car();
                carToSerialize.Id = c.Id;
                carToSerialize.AlreadyAssigned = c.AlreadyAssigned;
                carToSerialize.BoxNo = c.BoxNo;
                carToSerialize.Carno = c.Carno;
                carToSerialize.Class = c.Class;
                carToSerialize.DeliveryDocDate = c.DeliveryDocDate;

                List<ExamBoard> boardsToSerialize = new List<ExamBoard>();
                foreach (ExamBoard eb in c.ExamBoards)
                {
                    ExamBoard boardToSerialize = new ExamBoard();
                    boardToSerialize.Color = eb.Color;
                    boardToSerialize.Description = eb.Description;
                    boardToSerialize.Id = eb.Id;
                    boardToSerialize.IsColorUsed = eb.IsColorUsed;
                    boardToSerialize.Name = eb.Name;

                    boardsToSerialize.Add(boardToSerialize);
                }
                carToSerialize.ExamBoards = boardsToSerialize;
                carToSerialize.Fuel = c.Fuel;
                carToSerialize.Team = c.Team;

                //Car can be deleted if no score records found - add reference to scores
                List<Score> scoresToSerialize = new List<Score>();
                foreach (Score sc in c.Scores)
                {
                    Score scoreToSerialize = new Score();
                    scoreToSerialize.Id = sc.Id;
                    scoreToSerialize.GivenScore = sc.GivenScore;
                    scoreToSerialize.PenalityScore = sc.PenalityScore;
                    scoreToSerialize.PenalityNotes = sc.PenalityNotes;
                    scoreToSerialize.CorrectedScore = sc.CorrectedScore;
                    scoresToSerialize.Add(scoreToSerialize);
                }
                carToSerialize.Scores = scoresToSerialize;

                //Car can be deleted if no score records found or having givenscore = 0 - check this
                //carToSerialize.ReadOnly = Convert.ToBoolean(carToSerialize.ExamBoards.Count());
                carToSerialize.ReadOnly = Convert.ToBoolean(carToSerialize.Scores.Where(s => !s.GivenScore.Equals(0)).Count());

                carsToSerialize.Add(carToSerialize);
            }

            return carsToSerialize;
        }

        [WebMethod(Description = "Get All Cars filtered")]
        public List<Car> GetCarsByFilters(int? carno, int? regno, int? teamid, int? classid, int? fuelid, DateTime? deliverydocdate, int? boxno)
        {
            ATA_Context context = new ATA_Context();

            List<Car> cars = GetCars();

            if (carno.HasValue) cars = cars.Where(c => c.Carno.Equals(carno)).ToList();
            if (regno.HasValue) cars = cars.Where(c => c.Regno.Equals(regno)).ToList();
            if (teamid.HasValue) cars = cars.Where(c => c.Team.Id.Equals(teamid)).ToList();
            if (classid.HasValue) cars = cars.Where(c => c.Class.Id.Equals(classid)).ToList();
            if (fuelid.HasValue) cars = cars.Where(c => c.Fuel.Id.Equals(fuelid)).ToList();
            if (deliverydocdate.HasValue) cars = cars.Where(c => c.DeliveryDocDate.ToString("yyyyMMdd").Equals(deliverydocdate.Value.ToString("yyyyMMdd"))).ToList();
            if (boxno.HasValue) cars = cars.Where(c => c.BoxNo.Equals(boxno)).ToList();

            return cars;
        }

        [WebMethod(Description = "Get Car by id")]
        public Car GetCarById(int id)
        {
            ATA_Context context = new ATA_Context();

            List<Car> cars = GetCars();
            return cars.Where(c => c.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert Car")]
        public bool InsertCar(int carno, int? regno, int teamid, int classid, int fuelid, DateTime? deliverydocdate, int? boxno)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Team team = context.Teams.Where(t => t.Id.Equals(teamid)).FirstOrDefault();
                Class cls = context.Classes.Where(c => c.Id.Equals(classid)).FirstOrDefault();
                Fuel fuel = context.Fuels.Where(f => f.Id.Equals(fuelid)).FirstOrDefault();

                if ((team != null) && (cls != null) && (fuel != null))
                {
                    Car car = new Car();
                    car.Carno = carno;
                    if (regno.HasValue) car.Regno = Convert.ToInt32(regno);
                    car.Team = team;
                    car.Class = cls;
                    car.Fuel = fuel;
                    if (deliverydocdate.HasValue) car.DeliveryDocDate = Convert.ToDateTime(deliverydocdate);
                    if (boxno.HasValue) car.BoxNo = Convert.ToInt32(boxno);

                    context.Cars.Add(car);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Update Car")]
        public bool UpdateCar(int id, int? carno, int? regno, int teamid, int classid, int fuelid, DateTime? deliverydocdate, int? boxno)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Car car = context.Cars.Where(c => c.Id.Equals(id)).FirstOrDefault();
                Team team = context.Teams.Where(t => t.Id.Equals(teamid)).FirstOrDefault();
                Class cls = context.Classes.Where(c => c.Id.Equals(classid)).FirstOrDefault();
                Fuel fuel = context.Fuels.Where(f => f.Id.Equals(fuelid)).FirstOrDefault();

                if ((car != null) && (team != null) && (cls != null) && (fuel != null))
                {
                    if (carno.HasValue) car.Carno = Convert.ToInt32(carno);
                    if (regno.HasValue) car.Regno = Convert.ToInt32(regno);
                    car.Team = team;
                    car.Class = cls;
                    car.Fuel = fuel;
                    if (deliverydocdate.HasValue) car.DeliveryDocDate = Convert.ToDateTime(deliverydocdate);
                    if (boxno.HasValue) car.BoxNo = Convert.ToInt32(boxno);

                    //Event 2017 - Update Score Car Fuel Type if changed
                    List<ScoreEndurance> endurances = context.ScoresEndurance.Where(e => e.Score.Car.Id.Equals(id)).ToList();
                    if (endurances != null)
                    {
                        foreach (ScoreEndurance e in endurances)
                        {
                            e.FuelType = fuel.Id;
                        }
                    }

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Update Car From Scores - Update only some data")]
        public bool UpdateCarFromScores(int id, int fuelid, DateTime? deliverydocdate, int? boxno)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Car car = context.Cars.Where(c => c.Id.Equals(id)).FirstOrDefault();
                Fuel fuel = context.Fuels.Where(f => f.Id.Equals(fuelid)).FirstOrDefault();

                if ((car != null) && (fuel != null))
                {
                    car.Fuel = fuel;
                    if (deliverydocdate.HasValue) car.DeliveryDocDate = Convert.ToDateTime(deliverydocdate);
                    if (boxno.HasValue) car.BoxNo = Convert.ToInt32(boxno);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Car")]
        public bool DeleteCar(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Car car = context.Cars.Where(c => c.Id.Equals(id)).FirstOrDefault();

                //Car can be deleted if no score records found - Delete all references to Examboards
                foreach (ExamBoard examboard in car.ExamBoards)
                {
                    examboard.Cars.Remove(car);
                }

                //Car can be deleted if no score records found - Delete all references to Scores and Scores Details
                foreach (Score score in car.Scores)
                {
                    ScoreAcceleration scoreACC = context.ScoresAcceleration.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreACC != null)
                    {
                        context.ScoresAcceleration.Remove(scoreACC);
                    }

                    ScoreAutoCross scoreAC = context.ScoresAutoCross.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreAC != null)
                    {
                        context.ScoresAutoCross.Remove(scoreAC);
                    }

                    ScoreCost_2015 scoreC2015 = context.ScoresCost_2015.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreC2015 != null)
                    {
                        context.ScoresCost_2015.Remove(scoreC2015);
                    }

                    ScoreDesign1C3 scoreD1C3 = context.ScoresDesign1C3.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreD1C3 !=null ){
                        context.ScoresDesign1C3.Remove(scoreD1C3);
                    }

                    ScoreDesign1E scoreD1E = context.ScoresDesign1E.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreD1E != null){
                        context.ScoresDesign1E.Remove(scoreD1E);
                    }

                    ScoreEndurance scoreE = context.ScoresEndurance.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreE != null)
                    {
                        context.ScoresEndurance.Remove(scoreE);
                    }

                    ScorePresentation scoreP = context.ScoresPresentation.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreP != null)
                    {
                        context.ScoresPresentation.Remove(scoreP);
                    }

                    ScoreSkidPad scoreSP = context.ScoresSkidPad.Where(s => s.Score.Id.Equals(score.Id)).FirstOrDefault();
                    if(scoreSP != null)
                    {
                        context.ScoresSkidPad.Remove(scoreSP);
                    }
                }

                context.Cars.Remove(car);

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region Examiners
        [WebMethod(Description = "Get All Examiners")]
        public List<Examiner> GetExaminers()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<Examiner> examiners = context.Examiners.Include("ExamBoards").ToList();
            List<Examiner> examinersToSerialize = new List<Examiner>();
            foreach (Examiner e in examiners)
            {
                Examiner examinerToSerialize = new Examiner();
                examinerToSerialize.AlreadyAssigned = e.AlreadyAssigned;
                examinerToSerialize.FirstName = e.FirstName;
                examinerToSerialize.Id = e.Id;

                List<ExamBoard> boardsToSerialize = new List<ExamBoard>();
                foreach (ExamBoard eb in e.ExamBoards)
                {
                    ExamBoard boardToSerialize = new ExamBoard();
                    boardToSerialize.Color = eb.Color;
                    boardToSerialize.Description = eb.Description;
                    boardToSerialize.Id = eb.Id;
                    boardToSerialize.IsColorUsed = eb.IsColorUsed;
                    boardToSerialize.Name = eb.Name;

                    boardsToSerialize.Add(boardToSerialize);
                }
                examinerToSerialize.ExamBoards = boardsToSerialize;

                examinerToSerialize.Phone = e.Phone;
                examinerToSerialize.Surname = e.Surname;

                examinerToSerialize.ReadOnly = Convert.ToBoolean(examinerToSerialize.ExamBoards.Count());

                examinersToSerialize.Add(examinerToSerialize);
            }

            return examinersToSerialize;
        }

        [WebMethod(Description = "Get Examiner by id")]
        public Examiner GetExaminerById(int id)
        {
            ATA_Context context = new ATA_Context();

            List<Examiner> examiners = GetExaminers();
            return examiners.Where(e => e.Id.Equals(id)).FirstOrDefault();

        }

        [WebMethod(Description = "Insert Examiner")]
        public bool InsertExaminer(string firstname, string surname, string phone)
        {
            try
            {
                if ((firstname.Length > 0) && (surname.Length > 0))
                {
                    ATA_Context context = new ATA_Context();

                    Examiner examiner = new Examiner();
                    examiner.FirstName = firstname;
                    examiner.Surname = surname;
                    examiner.Phone = phone;

                    context.Examiners.Add(examiner);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Examiner by id")]
        public bool UpdateExaminer(int id, string firstname, string surname, string phone)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Examiner examiner = context.Examiners.Where(e => e.Id.Equals(id)).FirstOrDefault();

                if ((examiner != null))
                {
                    examiner.FirstName = firstname;
                    examiner.Surname = surname;
                    examiner.Phone = phone;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Examiner by id")]
        public bool DeleteExaminer(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Examiners.Remove(context.Examiners.Where(e => e.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region ExamBoards
        [WebMethod(Description = "Get All ExamBoards")]
        public List<ExamBoard> GetExamBoards()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            //AF - Giu 2016 - Examboard is connected to a single Event
            List<ExamBoard> examboards = context.ExamBoards.Include("Examiners").Include("Cars").Include("Event").ToList();

            List<ExamBoard> examboardsToSerialize = new List<ExamBoard>();
            foreach (ExamBoard e in examboards)
            {
                ExamBoard examboardToSerialize = new ExamBoard();

                List<Car> carsToSerialize = new List<Car>();
                foreach (Car c in e.Cars)
                {
                    Car cc = context.Cars.Include("Team").Include("Fuel").Include("Class").Where(ccc => ccc.Id.Equals(c.Id)).FirstOrDefault();

                    Car carToSerialize = new Car();
                    carToSerialize.AlreadyAssigned = c.AlreadyAssigned;
                    carToSerialize.BoxNo = c.BoxNo;
                    carToSerialize.Carno = c.Carno;

                    carToSerialize.Class = cc.Class;

                    carToSerialize.DeliveryDocDate = c.DeliveryDocDate;

                    carToSerialize.Fuel = cc.Fuel;

                    carToSerialize.Id = c.Id;
                    carToSerialize.ReadOnly = c.ReadOnly;
                    carToSerialize.Regno = c.Regno;

                    carToSerialize.Team = cc.Team;

                    carsToSerialize.Add(carToSerialize);
                }
                examboardToSerialize.Cars = carsToSerialize;

                List<Examiner> examinersToSerialize = new List<Examiner>();
                foreach (Examiner ex in e.Examiners)
                {
                    Examiner examinerToSerialize = new Examiner();

                    examinerToSerialize.AlreadyAssigned = true;
                    examinerToSerialize.FirstName = ex.FirstName;
                    examinerToSerialize.Id = ex.Id;
                    examinerToSerialize.Phone = ex.Phone;
                    examinerToSerialize.ReadOnly = ex.ReadOnly;
                    examinerToSerialize.Surname = ex.Surname;

                    examinersToSerialize.Add(examinerToSerialize);
                }
                examboardToSerialize.Examiners = examinersToSerialize;

                examboardToSerialize.Color = e.Color;
                examboardToSerialize.Description = e.Description;
                examboardToSerialize.Id = e.Id;
                examboardToSerialize.IsColorUsed = e.IsColorUsed;
                examboardToSerialize.Name = e.Name;

                //AF - Giu 2016 - Examboard is connected to a single Event
                Event eventToSerialize = context.Events.Include("EventType").Include("EventName").Where(ee => ee.Id.Equals(e.Event.Id)).FirstOrDefault();
                examboardToSerialize.Event = eventToSerialize;

                examboardsToSerialize.Add(examboardToSerialize);
            }

            return examboardsToSerialize;
        }

        [WebMethod(Description = "Get All ExamBoards")]
        public List<ExamBoard> GetExamBoardsWithCars()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<ExamBoard> examboards = context.ExamBoards.Include("Examiners").Include("Cars").ToList();

            List<ExamBoard> examboardsToSerialize = new List<ExamBoard>();
            foreach (ExamBoard e in examboards)
            {
                if (e.Cars.Count > 0)
                {
                    ExamBoard examboardToSerialize = new ExamBoard();

                    List<Car> carsToSerialize = new List<Car>();
                    foreach (Car c in e.Cars)
                    {
                        Car cc = context.Cars.Include("Team").Include("Fuel").Include("Class").Where(ccc => ccc.Id.Equals(c.Id)).FirstOrDefault();

                        Car carToSerialize = new Car();
                        carToSerialize.AlreadyAssigned = c.AlreadyAssigned;
                        carToSerialize.BoxNo = c.BoxNo;
                        carToSerialize.Carno = c.Carno;

                        carToSerialize.Class = cc.Class;

                        carToSerialize.DeliveryDocDate = c.DeliveryDocDate;

                        carToSerialize.Fuel = cc.Fuel;

                        carToSerialize.Id = c.Id;
                        carToSerialize.ReadOnly = c.ReadOnly;
                        carToSerialize.Regno = c.Regno;

                        carToSerialize.Team = cc.Team;

                        carsToSerialize.Add(carToSerialize);
                    }
                    examboardToSerialize.Cars = carsToSerialize;

                    examboardToSerialize.Color = e.Color;
                    examboardToSerialize.Description = e.Description;
                    examboardToSerialize.Id = e.Id;
                    examboardToSerialize.IsColorUsed = e.IsColorUsed;
                    examboardToSerialize.Name = e.Name;

                    examboardsToSerialize.Add(examboardToSerialize);
                }
            }

            return examboardsToSerialize;
        }

        [WebMethod(Description = "Get ExamBoard by id")]
        public ExamBoard GetExamBoardById(string id)
        {
            ATA_Context context = new ATA_Context();

            List<ExamBoard> examboards = GetExamBoards();
            return examboards.Where(e => e.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert ExamBoard")]
        public bool InsertExamBoard(string name, string description, bool isColorUsed, string color, int eventid)
        {
            try
            {
                if (name.Length > 0)
                {
                    ATA_Context context = new ATA_Context();

                    //AF - Giu 2016 - Examboard is connected to a single Event
                    Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();

                    ExamBoard examboard = new ExamBoard();
                    examboard.Name = name;
                    examboard.Description = description;
                    examboard.IsColorUsed = isColorUsed;
                    examboard.Color = color;
                    examboard.Event = evt;

                    context.ExamBoards.Add(examboard);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update ExamBoard by id")]
        public bool UpdateExamBoard(int id, string name, string description, bool isColorUsed, string color, int eventid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                //AF - Giu 2016 - Examboard is connected to a single Event
                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                ExamBoard examboard = context.ExamBoards.Where(e => e.Id.Equals(id)).FirstOrDefault();

                if ((examboard != null))
                {
                    examboard.Name = name;
                    examboard.Description = description;
                    examboard.IsColorUsed = isColorUsed;
                    examboard.Color = color;
                    examboard.Event = evt;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete ExamBoard by id")]
        public bool DeleteExamBoard(string id)
        {
            try
            {
                if (id != null && id.Trim() != string.Empty)
                {
                    ATA_Context context = new ATA_Context();
                    int MyId = int.Parse(id);
                    ExamBoard myExamboards = context.ExamBoards.Where(d => d.Id.Equals(MyId)).FirstOrDefault();
                    if (myExamboards != null)
                        context.ExamBoards.Remove(myExamboards);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }


        #endregion

        #region ExamBoardsExaminers
        [WebMethod(Description = "Get All Examiners for specified ExamBoard (already assigned and assignable)")]
        public List<Examiner> GetExamBoardExaminersAssignable(int id)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<Examiner> examinersToSerialize = new List<Examiner>();

            List<ExamBoard> examBoards = context.ExamBoards.Include("Examiners").ToList();
            ExamBoard examboard = examBoards.Where(e => e.Id.Equals(id)).FirstOrDefault();
            List<Examiner> assignedExaminers = examboard.Examiners.ToList();

            foreach (Examiner e in assignedExaminers)
            {
                Examiner examinerToSerialize = new Examiner();

                examinerToSerialize.AlreadyAssigned = true;
                examinerToSerialize.FirstName = e.FirstName;
                examinerToSerialize.Id = e.Id;
                examinerToSerialize.Phone = e.Phone;
                examinerToSerialize.ReadOnly = e.ReadOnly;
                examinerToSerialize.Surname = e.Surname;

                examinersToSerialize.Add(examinerToSerialize);
            }


            List<Examiner> examinersAll = context.Examiners.Include("ExamBoards").ToList();
            List<Examiner> assignableExaminers = examinersAll.Where(c => c.ExamBoards.Count() == 0).ToList();
            foreach (Examiner e in assignableExaminers)
            {
                Examiner examinerToSerialize = new Examiner();

                examinerToSerialize.AlreadyAssigned = false;
                examinerToSerialize.FirstName = e.FirstName;
                examinerToSerialize.Id = e.Id;
                examinerToSerialize.Phone = e.Phone;
                examinerToSerialize.ReadOnly = e.ReadOnly;
                examinerToSerialize.Surname = e.Surname;

                examinersToSerialize.Add(examinerToSerialize);
            }

            return examinersToSerialize;
        }

        [WebMethod(Description = "Get All Examboards having Examiners assigned")]
        public List<ExamBoard> GetExamBoardsWithExaminers()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            //AF - Giu 2016 - Examboard is connected to a single Event
            List<ExamBoard> examboards = context.ExamBoards.Include("Examiners").Include("Event").ToList();

            List<ExamBoard> examboardsToSerialize = new List<ExamBoard>();
            foreach (ExamBoard e in examboards)
            {
                if (e.Examiners.Count > 0)
                {
                    ExamBoard examboardToSerialize = new ExamBoard();

                    List<Examiner> examinersToSerialize = new List<Examiner>();
                    foreach (Examiner ee in e.Examiners)
                    {
                        Examiner ex = context.Examiners.Where(eee => eee.Id.Equals(ee.Id)).FirstOrDefault();

                        Examiner examinerToSerialize = new Examiner();
                        examinerToSerialize.AlreadyAssigned = ex.AlreadyAssigned;
                        examinerToSerialize.FirstName = ex.FirstName;
                        examinerToSerialize.Id = ex.Id;
                        examinerToSerialize.Phone = ex.Phone;
                        examinerToSerialize.ReadOnly = ex.ReadOnly;
                        examinerToSerialize.Surname = ex.Surname;

                        examinersToSerialize.Add(examinerToSerialize);
                    }
                    examboardToSerialize.Examiners = examinersToSerialize;

                    examboardToSerialize.Color = e.Color;
                    examboardToSerialize.Description = e.Description;
                    examboardToSerialize.Id = e.Id;
                    examboardToSerialize.IsColorUsed = e.IsColorUsed;
                    examboardToSerialize.Name = e.Name;

                    //AF - Giu 2016 - Examboard is connected to a single Event
                    Event eventToSerialize = context.Events.Include("EventType").Include("EventName").Where(ee => ee.Id.Equals(e.Event.Id)).FirstOrDefault();
                    examboardToSerialize.Event = eventToSerialize;

                    examboardsToSerialize.Add(examboardToSerialize);
                }
            }

            return examboardsToSerialize;
        }

        [WebMethod(Description = "Get All Examiners for the specified Examboard")]
        public List<Examiner> GetExamBoardExaminers(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.ExamBoards.Where(e => e.Id.Equals(id)).FirstOrDefault().Examiners.ToList();
        }

        [WebMethod(Description = "Insert Examiner for the specified Examboard")]
        public bool InsertExamBoardExaminer(int examboardid, int examinerid)
        {
            //INSERT OR IGNORE INTO TB_ExamBoards2Examiners (examboardid, examinerid) VALUES (?,?)
            try
            {
                ATA_Context context = new ATA_Context();

                ExamBoard examboard = context.ExamBoards.Where(e => e.Id.Equals(examboardid)).FirstOrDefault();
                Examiner examiner = context.Examiners.Where(e => e.Id.Equals(examinerid)).FirstOrDefault();

                examboard.Examiners.Add(examiner);

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Delete Examiner for the specified Examboard")]
        public bool DeleteExamBoardExaminer(int examboardid, int examinerid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ExamBoard examboard = context.ExamBoards.Where(e => e.Id.Equals(examboardid)).FirstOrDefault();
                Examiner examiner = context.Examiners.Where(e => e.Id.Equals(examinerid)).FirstOrDefault();

                examboard.Examiners.Remove(examiner);

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        #endregion

        #region ExamBoardsCar
        [WebMethod(Description = "Get All Cars for specified ExamBoard (already assigned and assignable)")]
        public List<Car> GetExamBoardCarsAssignable(int id)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<Car> carsToSerialize = new List<Car>();

            List<ExamBoard> examBoards = context.ExamBoards.Include("Cars").ToList();
            ExamBoard examboard = examBoards.Where(e => e.Id.Equals(id)).FirstOrDefault();
            List<Car> assignedCars = examboard.Cars.ToList();

            foreach (Car c in assignedCars)
            {
                Car cc = context.Cars.Include("Team").Include("Fuel").Include("Class").Where(ccc => ccc.Id.Equals(c.Id)).FirstOrDefault();

                Car carToSerialize = new Car();
                carToSerialize.AlreadyAssigned = true;
                carToSerialize.BoxNo = c.BoxNo;
                carToSerialize.Carno = c.Carno;

                carToSerialize.Class = cc.Class;

                carToSerialize.DeliveryDocDate = c.DeliveryDocDate;

                carToSerialize.Fuel = cc.Fuel;

                carToSerialize.Id = c.Id;
                carToSerialize.ReadOnly = c.ReadOnly;
                carToSerialize.Regno = c.Regno;

                carToSerialize.Team = cc.Team;

                carsToSerialize.Add(carToSerialize);
            }


            List<Car> carsAll = context.Cars.Include("ExamBoards").ToList();
            //A car can be assigned to more than an Examboard - req.Ciadamidaro Set 2015
            //So load all cars
            //List<Car> assignableCars = carsAll.Where(c => c.ExamBoards.Count() == 0).ToList();
            List<Car> assignableCars = carsAll.ToList();
            foreach (Car c in assignableCars)
            {
                //Add the car only if not already present
                Car crs = carsToSerialize.Where(cts => cts.Id.Equals(c.Id)).FirstOrDefault();
                if (crs == null)
                {
                    Car cc = context.Cars.Include("Team").Include("Fuel").Include("Class").Where(ccc => ccc.Id.Equals(c.Id)).FirstOrDefault();

                    Car carToSerialize = new Car();
                    carToSerialize.AlreadyAssigned = false;
                    carToSerialize.BoxNo = c.BoxNo;
                    carToSerialize.Carno = c.Carno;

                    carToSerialize.Class = cc.Class;

                    carToSerialize.DeliveryDocDate = c.DeliveryDocDate;

                    carToSerialize.Fuel = cc.Fuel;

                    carToSerialize.Id = c.Id;
                    carToSerialize.ReadOnly = c.ReadOnly;
                    carToSerialize.Regno = c.Regno;

                    carToSerialize.Team = cc.Team;

                    carsToSerialize.Add(carToSerialize);
                }
            }
            return carsToSerialize;
        }

        [WebMethod(Description = "Get All Cars for the specified Examboard")]
        public List<Car> GetExamBoardCars(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.ExamBoards.Where(e => e.Id.Equals(id)).FirstOrDefault().Cars.ToList();
        }

        [WebMethod(Description = "Insert Car for the specified Examboard")]
        public bool InsertExamBoardCar(int examboardid, int carid)
        {
            //INSERT OR IGNORE INTO TB_ExamBoards2Cars (examboardid, carid) VALUES (?,?)
            try
            {
                ATA_Context context = new ATA_Context();

                ExamBoard examboard = context.ExamBoards.Where(e => e.Id.Equals(examboardid)).FirstOrDefault();
                Car car = context.Cars.Where(e => e.Id.Equals(carid)).FirstOrDefault();

                examboard.Cars.Add(car);

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Delete Car for the specified Examboard")]
        public bool DeleteExamBoardCar(int examboardid, int carid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ExamBoard examboard = context.ExamBoards.Where(e => e.Id.Equals(examboardid)).FirstOrDefault();
                Car car = context.Cars.Where(e => e.Id.Equals(carid)).FirstOrDefault();

                examboard.Cars.Remove(car);

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region EventsTypes
        [WebMethod(Description = "Get All Events Types")]
        public List<EventType> GetEventsTypes()
        {
            ATA_Context context = new ATA_Context();
            return context.EventTypes.ToList();
        }

        [WebMethod(Description = "Get Event Type by id")]
        public EventType GetEventTypeById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.EventTypes.Where(e => e.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Event Type by name")]
        public EventType GetEventType(string name)
        {
            ATA_Context context = new ATA_Context();
            return context.EventTypes.Where(e => e.Name.Equals(name)).FirstOrDefault();
        }

        [WebMethod(Description = "Insert Event Type")]
        public bool InsertEventType(string name)
        {
            try
            {
                if (name.Length > 0)
                {
                    ATA_Context context = new ATA_Context();

                    EventType eventType = new EventType();
                    eventType.Name = name;

                    context.EventTypes.Add(eventType);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Event Type by id")]
        public bool UpdateEventType(int id, string name)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                EventType eventType = context.EventTypes.Where(e => e.Id.Equals(id)).FirstOrDefault();

                if ((eventType != null))
                {
                    eventType.Name = name;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Event Type by id")]
        public bool DeleteEventType(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.EventTypes.Remove(context.EventTypes.Where(e => e.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region EventsNames
        [WebMethod(Description = "Get All Events Names")]
        public List<EventName> GetEventsNames()
        {
            ATA_Context context = new ATA_Context();
            return context.EventNames.ToList();
        }

        [WebMethod(Description = "Get Event Name by id")]
        public EventName GetEventNameById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.EventNames.Where(e => e.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Event Name by name")]
        public EventName GetEventName(string name)
        {
            ATA_Context context = new ATA_Context();
            return context.EventNames.Where(e => e.Name.Equals(name)).FirstOrDefault();
        }

        [WebMethod(Description = "Get Event Name by Event Type id")]
        public List<EventName> GetEventNameByEventTypeId(int id)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;
            return context.EventNames.Where(e => e.EventType.Id.Equals(id)).ToList();
        }

        [WebMethod(Description = "Insert Event Name")]
        public bool InsertEventName(string name, int eventTypeId)
        {
            try
            {
                if (name.Length > 0)
                {
                    ATA_Context context = new ATA_Context();

                    EventType eventType = context.EventTypes.Where(e => e.Id.Equals(eventTypeId)).FirstOrDefault();

                    if (eventType != null)
                    {
                        EventName eventName = new EventName();
                        eventName.Name = name;
                        eventName.EventType = eventType;

                        context.EventNames.Add(eventName);

                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Event Name by id")]
        public bool UpdateEventName(int id, string name, int eventTypeId)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                EventType eventType = context.EventTypes.Where(e => e.Id.Equals(eventTypeId)).FirstOrDefault();
                EventName eventName = context.EventNames.Where(e => e.Id.Equals(id)).FirstOrDefault();

                if ((eventName != null) && (eventType != null))
                {
                    eventName.Name = name;
                    eventName.EventType = eventType;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Event Name by id")]
        public bool DeleteEventName(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.EventNames.Remove(context.EventNames.Where(e => e.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }
        #endregion

        #region Events
        [WebMethod(Description = "Get All Events")]
        public List<Event> GetEvents()
        {
            ATA_Context context = new ATA_Context();

            List<Event> events = context.Events.ToList();
            List<Score> scores = context.Scores.ToList();

            foreach (Event e in events)
            {
                int availableScores = scores.Where(s => s.Event.Id.Equals(e.Id)).Count();
                e.ReadOnly = Convert.ToBoolean(availableScores);
            }
            return events;
        }

        [WebMethod(Description = "Insert Event")]
        public bool InsertEvent(int eventTypeId, int eventNameId, string description, bool isScoreNumeric, double maximumscore)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                EventType eventType = context.EventTypes.Where(e => e.Id.Equals(eventTypeId)).FirstOrDefault();
                EventName eventName = context.EventNames.Where(e => e.Id.Equals(eventNameId)).FirstOrDefault();

                if ((eventType != null) && (eventName != null))
                {
                    Event evt = new Event();
                    evt.EventType = eventType;
                    evt.EventName = eventName;
                    evt.Description = description;
                    evt.IsScoreNumeric = isScoreNumeric;
                    evt.MaximumScore = maximumscore;

                    context.Events.Add(evt);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Update Event")]
        public bool UpdateEvent(int id, int eventTypeId, int eventNameId, string description, bool isScoreNumeric, double maximumscore)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(id)).FirstOrDefault();

                EventType eventType = context.EventTypes.Where(e => e.Id.Equals(eventTypeId)).FirstOrDefault();
                EventName eventName = context.EventNames.Where(e => e.Id.Equals(eventNameId)).FirstOrDefault();

                if ((evt != null) && (eventType != null) && (eventName != null))
                {
                    evt.EventType = eventType;
                    evt.EventName = eventName;
                    evt.Description = description;
                    evt.IsScoreNumeric = isScoreNumeric;
                    evt.MaximumScore = maximumscore;

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                throw;
            }
        }

        [WebMethod(Description = "Delete Event")]
        public bool DeleteEvent(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();
                context.Events.Remove(context.Events.Where(e => e.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        #endregion

        #region Scores
        [WebMethod(Description = "Get All Scores")]
        public List<Score> GetScores()
        {
            ATA_Context context = new ATA_Context();
            return context.Scores.ToList();
        }

        [WebMethod(Description = "Get Score by Id")]
        public Score GetScoreById(int id)
        {
            ATA_Context context = new ATA_Context();
            return context.Scores.Where(s => s.Id.Equals(id)).FirstOrDefault();
        }

        [WebMethod(Description = "Get All Classes Events and, if any, Scores")]
        public List<CustomScoresClassesEvents> GetScoresClassesEvents()
        {
            ATA_Context context = new ATA_Context();

            List<CustomScoresClassesEvents> scoresClassEvents = new List<CustomScoresClassesEvents>();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "SELECT ClassId, ClassName, EventId, Description, EventNameId, EventName, EventTypeId, EventTypeName, GivenScore FROM VW_Scores_Cars_Classes ORDER BY ClassName, EventTypeName";
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            CustomScoresClassesEvents scoresClassEvent = new CustomScoresClassesEvents();
                            scoresClassEvent.ClassId = (int)dr["ClassId"];
                            scoresClassEvent.ClassName = (string)dr["ClassName"];
                            scoresClassEvent.EventId = (int)dr["EventId"];
                            scoresClassEvent.Description = (string)dr["Description"];
                            scoresClassEvent.EventNameId = (int)dr["EventNameId"];
                            scoresClassEvent.EventName = (string)dr["EventName"];
                            scoresClassEvent.EventTypeId = (int)dr["EventTypeId"];
                            scoresClassEvent.EventTypeName = (string)dr["EventTypeName"];
                            scoresClassEvent.GivenScore = (double)dr["GivenScore"];

                            scoresClassEvents.Add(scoresClassEvent);

                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();

                }
            }
            return scoresClassEvents;
        }

        [WebMethod(Description = "Get All Scores By Class and Event")]
        public List<CustomScores> GetScoresByClassAndEvent(int classid, int eventid)
        {
            ATA_Context context = new ATA_Context();

            List<CustomScores> scores = new List<CustomScores>();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "SELECT EventId, Description, IsScoreNumeric, MaximumScore, EventNameId, EventTypeId, EventName, EventTypeName, CarId, CarNo, RegNo, DeliveryDocDate, BoxNo, ClassId, FuelId, TeamId, ClassName, FuelName, TeamName, University, Country, GivenScore, PenalityScore, PenalityNotes, CorrectedScore, PageToJump, ScoreId, UploadingExamboard FROM VW_Scores WHERE ClassId = " + classid + " AND EventId = " + eventid;
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            CustomScores score = new CustomScores();

                            score.EventId = (int)dr["EventId"];
                            score.Description = (string)dr["Description"];
                            score.IsScoreNumeric = (bool)dr["IsScoreNumeric"];
                            score.MaximumScore = (double)dr["MaximumScore"];
                            score.EventNameId = (int)dr["EventNameId"];
                            score.EventName = (string)dr["EventName"];
                            score.EventTypeId = (int)dr["EventTypeId"];
                            score.EventTypeName = (string)dr["EventTypeName"];
                            score.CarId = (int)dr["CarId"];
                            score.CarNo = (int)dr["CarNo"];
                            score.RegNo = (int)dr["RegNo"];
                            score.DeliveryDocDate = (DateTime)dr["DeliveryDocDate"];
                            score.BoxNo = (int)dr["BoxNo"];
                            score.ClassId = (int)dr["ClassId"];
                            score.ClassName = (string)dr["ClassName"];
                            score.FuelId = (int)dr["FuelId"];
                            score.FuelName = (string)dr["FuelName"];
                            score.TeamId = (int)dr["TeamId"];
                            score.TeamName = (string)dr["TeamName"];
                            score.University = (string)dr["University"];
                            score.Country = (string)dr["Country"];
                            score.GivenScore = Math.Round((double)dr["GivenScore"], 3);
                            score.PenalityScore = (double)dr["PenalityScore"];
                            score.PenalityNotes = (string)dr["PenalityNotes"];
                            score.CorrectedScore = (double)dr["CorrectedScore"];
                            score.PageToJump = (string)dr["PageToJump"];
                            score.ScoreId = (int)dr["ScoreId"];
                            score.ExamBoardName = string.Empty;
                            //Event 2017 - Save also uploading examboard
                            score.UploadingExamboard = (int)dr["UploadingExamboard"];

                            //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                            score.IsAnElectricCar = (score.FuelName.ToUpper().Contains("ELECTRI"));

                            Car car = context.Cars.Where(c => c.Id.Equals(score.CarId)).FirstOrDefault();
                            if (car != null)
                            {
                                //Event 2017 - Wrong Examboard name is displayed
                                //ExamBoard eb = car.ExamBoards.FirstOrDefault();
                                ExamBoard eb = context.ExamBoards.Where(e => e.Id.Equals(score.UploadingExamboard)).FirstOrDefault();

                                if (eb != null)
                                {
                                    score.ExamBoardName = eb.Name;
                                }
                            }

                            scores.Add(score);

                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();

                }
            }
            return scores.OrderByDescending(d => d.GivenScore).ToList();
        }

        [WebMethod(Description = "Get Event Detail by Class and Event")]
        public CustomScoreEventDetail GetScoreEventDetail(int classid, int eventid)
        {
            ATA_Context context = new ATA_Context();

            Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
            Class cls = context.Classes.Where(c => c.Id.Equals(classid)).FirstOrDefault();

            CustomScoreEventDetail scoreED = new CustomScoreEventDetail();
            scoreED.ClassName = cls.Name;
            scoreED.EventName = evt.EventName.Name;
            scoreED.Description = evt.Description;
            scoreED.EventTypeName = evt.EventType.Name;

            return scoreED;
        }

        [WebMethod(Description = "Insert Score")]
        public bool InsertScore(int eventid, int carid, double givenscore, double penalityscore, string penalitynotes, double correctedscore)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                if ((evt != null) && (car != null))
                {
                    Score score = new Score();
                    score.Event = evt;
                    score.Car = car;
                    score.GivenScore = givenscore;
                    score.PenalityScore = penalityscore;
                    score.PenalityNotes = penalitynotes;
                    score.CorrectedScore = correctedscore;

                    context.Scores.Add(score);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Update Score")]
        public bool UpdateScore(int eventid, int carid, double givenscore, double penalityscore, string penalitynotes, double correctedscore)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Equals(carid)).FirstOrDefault();

                if ((evt != null) && (car != null))
                {
                    Score score = context.Scores
                        .Where(s => s.Event.Equals(evt))
                        .Where(s => s.Car.Equals(car))
                        .FirstOrDefault();

                    if (score != null)
                    {
                        score.Event = evt;
                        score.Car = car;
                        score.GivenScore = givenscore;
                        score.PenalityScore = penalityscore;
                        score.PenalityNotes = penalitynotes;
                        score.CorrectedScore = correctedscore;

                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Score by Event and Car")]
        public bool DeleteScoreByEventAndCar(int eventid, int carid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Equals(carid)).FirstOrDefault();

                if ((evt != null) && (car != null))
                {
                    Score score = context.Scores
                        .Where(s => s.Event.Equals(evt))
                        .Where(s => s.Car.Equals(car))
                        .FirstOrDefault();

                    if (score != null)
                    {
                        context.Scores.Remove(score);

                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Delete Score")]
        public bool DeleteScore(int id)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                context.Scores.Remove(context.Scores.Where(s => s.Id.Equals(id)).FirstOrDefault());

                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

        [WebMethod(Description = "Insert Scores - One Shot")]
        public bool InsertScoresOneShot(string pairs)
        {

            ATA_Context context = new ATA_Context();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "INSERT INTO Scores (Event_Id, Car_Id, GivenScore, PenalityScore, PenalityNotes, CorrectedScore) VALUES " + pairs;
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    int r = command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();
                    context.SaveChanges();
                }
            }
            return true;
        }

        [WebMethod(Description = "Delete Scores  by Event and Car - One Shot")]
        public bool DeleteScoresOneShot(int eventid, int carid)
        {

            ATA_Context context = new ATA_Context();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "DELETE FROM Scores WHERE Event_Id = " + eventid + " AND Car_Id = " + carid;
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    int r = command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();
                    context.SaveChanges();
                }
            }
            return true;
        }
        #endregion

        #region ScoresDesign1E
        [WebMethod(Description = "Get All Scores Design1E")]
        public List<ScoreDesign1E> GetScoresDesign1E()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<ScoreDesign1E> scoresDesign1E = context.ScoresDesign1E.Include("Score").ToList();
            return scoresDesign1E;
        }

        [WebMethod(Description = "Get Score Design1E by scoreid")]
        public ScoreDesign1E GetScoreDesign1E(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            ScoreDesign1E scoreDesign1E = context.ScoresDesign1E.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreDesign1E;
        }

        [WebMethod(Description = "Insert Score Design1E")]
        public bool InsertScoreDesign1E(int eventid, int carid, int scoreid, int suspension, int framebodyaero, int tractivedriverecoverysystem, int cockpitcontrolsbrakessafety, int systemmanagementintegration, int manufacturabilityserviceability, int aestheticsstyle, int creativity, int carweight, int overall, string suspensionnotes, string framebodyaeronotes, string tractivedriverecoverysystemnotes, string cockpitcontrolsbrakessafetynotes, string systemmanagementintegrationnotes, string manufacturabilityserviceabilitynotes, string aestheticsstylenotes, string creativitynotes, int miscellaneous, string miscellaneousnotes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreDesign1E score1E = new ScoreDesign1E();

                score1E.Score = score;
                score1E.Suspension = suspension;
                score1E.FrameBodyAero = framebodyaero;
                score1E.TractiveDriveRecoverySystem = tractivedriverecoverysystem;
                score1E.CockpitControlsBrakesSafety = cockpitcontrolsbrakessafety;
                score1E.SystemManagementIntegration = systemmanagementintegration;
                score1E.ManufacturabilityServiceability = manufacturabilityserviceability;
                score1E.AestheticsStyle = aestheticsstyle;
                score1E.Creativity = creativity;
                score1E.CarWeight = carweight;

                score1E.SuspensionNotes = suspensionnotes;
                score1E.FrameBodyAeroNotes = framebodyaeronotes;
                score1E.TractiveDriveRecoverySystemNotes = tractivedriverecoverysystemnotes;
                score1E.CockpitControlsBrakesSafetyNotes = cockpitcontrolsbrakessafetynotes;
                score1E.SystemManagementIntegrationNotes = systemmanagementintegrationnotes;
                score1E.ManufacturabilityServiceabilityNotes = manufacturabilityserviceabilitynotes;
                score1E.AestheticsStyleNotes = aestheticsstylenotes;
                score1E.CreativityNotes = creativitynotes;

                score1E.Miscellaneous = miscellaneous;
                score1E.MiscellaneousNotes = miscellaneousnotes;

                context.ScoresDesign1E.Add(score1E);
                context.SaveChanges();

				//Update Total Score in the main table
				score.GivenScore = score1E.RecalculateTotalScore();

                //SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
                if (score.GivenScore != overall)
                    score.GivenScore = overall;

                context.SaveChanges();

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Design1E")]
        public bool UpdateScoreDesign1E(int scoreid, int suspension, int framebodyaero, int tractivedriverecoverysystem, int cockpitcontrolsbrakessafety, int systemmanagementintegration, int manufacturabilityserviceability, int aestheticsstyle, int creativity, int carweight, int overall, string suspensionnotes, string framebodyaeronotes, string tractivedriverecoverysystemnotes, string cockpitcontrolsbrakessafetynotes, string systemmanagementintegrationnotes, string manufacturabilityserviceabilitynotes, string aestheticsstylenotes, string creativitynotes, int miscellaneous, string miscellaneousnotes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreDesign1E score1E = context.ScoresDesign1E.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score1E != null)
                {
                    score1E.Suspension = suspension;
                    score1E.FrameBodyAero = framebodyaero;
                    score1E.TractiveDriveRecoverySystem = tractivedriverecoverysystem;
                    score1E.CockpitControlsBrakesSafety = cockpitcontrolsbrakessafety;
                    score1E.SystemManagementIntegration = systemmanagementintegration;
                    score1E.ManufacturabilityServiceability = manufacturabilityserviceability;
                    score1E.AestheticsStyle = aestheticsstyle;
                    score1E.Creativity = creativity;
                    score1E.CarWeight = carweight;

                    score1E.SuspensionNotes = suspensionnotes;
                    score1E.FrameBodyAeroNotes = framebodyaeronotes;
                    score1E.TractiveDriveRecoverySystemNotes = tractivedriverecoverysystemnotes;
                    score1E.CockpitControlsBrakesSafetyNotes = cockpitcontrolsbrakessafetynotes;
                    score1E.SystemManagementIntegrationNotes = systemmanagementintegrationnotes;
                    score1E.ManufacturabilityServiceabilityNotes = manufacturabilityserviceabilitynotes;
                    score1E.AestheticsStyleNotes = aestheticsstylenotes;
                    score1E.CreativityNotes = creativitynotes;

                    score1E.Miscellaneous = miscellaneous;
                    score1E.MiscellaneousNotes = miscellaneousnotes;

                    context.SaveChanges();

					//Update Total Score in the main table
					score1E.Score.GivenScore = score1E.RecalculateTotalScore();

                    //SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
                    if (score1E.Score.GivenScore != overall)
                        score1E.Score.GivenScore = overall;

                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Design1E")]
        public bool DeleteScoreDesign1E(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreDesign1E score1E = context.ScoresDesign1E.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score1E != null)
                {
                    context.ScoresDesign1E.Remove(score1E);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score Design")]
        public List<DesignRankingObject> CalculateDesignScore(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<DesignRankingObject> ranks = new List<DesignRankingObject>();
            List<Score> myscores = new List<Score>();
            List<Score> myscoresDuplicatedRecords = new List<Score>();
            try
            {
                myscoresDuplicatedRecords = context.Scores.Where(d => d.Event.Id.Equals(5) && d.Car.Class.Id.Equals(classId)).ToList(); // design

                List<Car> myCarsInScores = new List<Car>();
                foreach (Score c in myscoresDuplicatedRecords)
                {
                    if (myCarsInScores.Where(d => d.Id.Equals(c.Car.Id)).Count() == 0)
                        myCarsInScores.Add(context.Cars.Where(d => d.Id.Equals(c.Car.Id)).FirstOrDefault());
                }
                Score scoreToAdd;
                foreach (Car c in myCarsInScores)
                {
                    scoreToAdd = new Score();
                    scoreToAdd = myscoresDuplicatedRecords.Where(d => d.Car.Id.Equals(c.Id)).OrderByDescending(d => d.Id).FirstOrDefault();

                    if (scoreToAdd != null)
                        myscores.Add(scoreToAdd);
                }

                if (myscores.Count == 0)
                    return ranks;

                double maximumScore = context.Events.Where(f => f.EventName.Id.Equals(3)).FirstOrDefault().MaximumScore;
                DesignRankingObject myrank;

                List<ScoreDesign1C3> myList1C3 = new List<ScoreDesign1C3>();
                myList1C3 = context.ScoresDesign1C3.ToList();
                List<ScoreDesign1E> myList1E = new List<ScoreDesign1E>();
                myList1E = context.ScoresDesign1E.ToList();

                foreach (Score s in myscores)
                {
                    ScoreDesign1E score1E = new ScoreDesign1E();

                    myrank = new DesignRankingObject();

                    score1E = myList1E.Where(d => d.Score.Id.Equals(s.Id)).FirstOrDefault();
                    if (score1E != null)
                    {
						//Event 2017 - Why updating only when is set to zero? 
						//if (score1E.Score.GivenScore == 0)
						//{
							score1E.Score.GivenScore = score1E.RecalculateTotalScore(); ;
                        //}
                    }
                    ScoreDesign1C3 score1C3 = new ScoreDesign1C3();
                    score1C3 = myList1C3.Where(d => d.Score.Id.Equals(s.Id)).FirstOrDefault();
                    if (score1C3 != null)
                    {
                        //Event 2017 - Why updating only when is set to zero?
                        //if (score1C3.Score.GivenScore == 0)
                        //{
                            score1C3.Score.GivenScore = score1C3.RecalculateTotalScore();
                        //}
                    }

                }
                context.SaveChanges();

                double max = myscores.Max(d => d.GivenScore);
                foreach (Score s in myscores)
                {
                    ScoreDesign1E score1E = new ScoreDesign1E();

                    myrank = new DesignRankingObject();

                    score1E = myList1E.Where(d => d.Score.Id.Equals(s.Id)).FirstOrDefault();
                    if (score1E != null)
                    {
                        myrank.ScoreValue = s.GivenScore;
                        myrank.RegNum = s.Car.Regno;
                        myrank.CarNum = s.Car.Carno;
                        myrank.TeamId = s.Car.Team.Id;
                        myrank.TeamName = s.Car.Team.Name;
                        myrank.University = s.Car.Team.University;

                        myrank.Suspension = score1E.Suspension;
                        myrank.FrameBodyAero = score1E.FrameBodyAero;

                        // SWITCHABLE FIELD
                        myrank.TractiveOrPowerTrain = score1E.TractiveDriveRecoverySystem;

                        myrank.CockpitControlsBrakesSafety = score1E.CockpitControlsBrakesSafety;
                        myrank.SystemManagementIntegration = score1E.SystemManagementIntegration;
                        myrank.ManufacturabilityServiceability = score1E.ManufacturabilityServiceability;
                        myrank.AestheticsStyle = score1E.AestheticsStyle;
                        myrank.Creativity = score1E.Creativity;
                        myrank.CarWeight = score1E.CarWeight;

                        myrank.SuspensionNotes = score1E.SuspensionNotes;
                        myrank.FrameBodyAeroNotes = score1E.FrameBodyAeroNotes;
                        myrank.TractiveOrPowerTrainNotes = score1E.TractiveDriveRecoverySystemNotes;
                        myrank.CockpitControlsBrakesSafetyNotes = score1E.CockpitControlsBrakesSafetyNotes;
                        myrank.SystemManagementIntegrationNotes = score1E.SystemManagementIntegrationNotes;
                        myrank.ManufacturabilityServiceabilityNotes = score1E.ManufacturabilityServiceabilityNotes;
                        myrank.AestheticsStyleNotes = score1E.AestheticsStyleNotes;
                        myrank.CreativityNotes = score1E.CreativityNotes;

                        myrank.Miscellaneous = score1E.Miscellaneous;
                        myrank.MiscellaneousNotes = score1E.MiscellaneousNotes;

                        // WORKAROUND  ----------------------------------
                        ExamBoard a = s.Car.ExamBoards.Where(d => d.Name.ToUpper().Contains("DESIGN")).FirstOrDefault();
                        if (a != null)
                            myrank.ExamBoardName = a.Name;
                        else
                            myrank.ExamBoardName = "-";
                        if (max != 0)
                            myrank.NormalizedScore = Math.Round(s.GivenScore * maximumScore / max, 3);

                    }
                    ScoreDesign1C3 score1C3 = new ScoreDesign1C3();
                    score1C3 = myList1C3.Where(d => d.Score.Id.Equals(s.Id)).FirstOrDefault();
                    if (score1C3 != null)
                    {

                        myrank.ScoreValue = s.GivenScore;
                        myrank.RegNum = s.Car.Regno;
                        myrank.CarNum = s.Car.Carno;
                        myrank.TeamId = s.Car.Team.Id;
                        myrank.TeamName = s.Car.Team.Name;
                        myrank.University = s.Car.Team.University;

                        myrank.Suspension = score1C3.Suspension;
                        myrank.FrameBodyAero = score1C3.FrameBodyAero;

                        // SWITCHABLE FIELD
                        myrank.TractiveOrPowerTrain = score1C3.Powertrain;

                        myrank.CockpitControlsBrakesSafety = score1C3.CockpitControlsBrakesSafety;
                        myrank.SystemManagementIntegration = score1C3.SystemManagementIntegration;
                        myrank.ManufacturabilityServiceability = score1C3.ManufacturabilityServiceability;
                        myrank.AestheticsStyle = score1C3.AestheticsStyle;
                        myrank.Creativity = score1C3.Creativity;
                        myrank.CarWeight = score1C3.CarWeight;

                        myrank.SuspensionNotes = score1C3.SuspensionNotes;
                        myrank.FrameBodyAeroNotes = score1C3.FrameBodyAeroNotes;
                        myrank.TractiveOrPowerTrainNotes = score1C3.PowertrainNotes;
                        myrank.CockpitControlsBrakesSafetyNotes = score1C3.CockpitControlsBrakesSafetyNotes;
                        myrank.SystemManagementIntegrationNotes = score1C3.SystemManagementIntegrationNotes;
                        myrank.ManufacturabilityServiceabilityNotes = score1C3.ManufacturabilityServiceabilityNotes;
                        myrank.AestheticsStyleNotes = score1C3.AestheticsStyleNotes;
                        myrank.CreativityNotes = score1C3.CreativityNotes;

                        myrank.Miscellaneous = score1C3.Miscellaneous;
                        myrank.MiscellaneousNotes = score1C3.MiscellaneousNotes;

                        // WORKAROUND  ----------------------------------
                        ExamBoard a = s.Car.ExamBoards.Where(d => d.Name.ToUpper().Contains("DESIGN")).FirstOrDefault();
                        if (a != null)
                            myrank.ExamBoardName = a.Name;
                        else
                            myrank.ExamBoardName = "-";
                        if (max != 0)
                            myrank.NormalizedScore = Math.Round(s.GivenScore * maximumScore / max, 3);
                    }

                    //Display the car with the color of the committee, if valued and whether to use
                    //ONLY HERE
                    myrank.SetRankingColor(s);

                    ranks.Add(myrank);
                }


            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<DesignRankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();
        }

        #endregion

        #region ScoresDesign1C3
        [WebMethod(Description = "Get All Scores Design1C3")]
        public List<ScoreDesign1C3> GetScoresDesign1C3()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<ScoreDesign1C3> scoresDesign1C3 = context.ScoresDesign1C3.Include("Score").ToList();
            return scoresDesign1C3;
        }

        [WebMethod(Description = "Get Score Design1C3 by scoreid")]
        public ScoreDesign1C3 GetScoreDesign1C3(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            ScoreDesign1C3 scoreDesign1C3 = context.ScoresDesign1C3.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreDesign1C3;
        }

        [WebMethod(Description = "Insert Score Design1C3")]
        public bool InsertScoreDesign1C3(int eventid, int carid, int scoreid, int suspension, int framebodyaero, int powertrain, int cockpitcontrolsbrakessafety, int systemmanagementintegration, int manufacturabilityserviceability, int aestheticsstyle, int creativity, int carweight, int overall, string suspensionnotes, string framebodyaeronotes, string powertrainnotes, string cockpitcontrolsbrakessafetynotes, string systemmanagementintegrationnotes, string manufacturabilityserviceabilitynotes, string aestheticsstylenotes, string creativitynotes, int miscellaneous, string miscellaneousnotes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreDesign1C3 score1C3 = new ScoreDesign1C3();

                score1C3.Score = score;
                score1C3.Suspension = suspension;
                score1C3.FrameBodyAero = framebodyaero;
                score1C3.Powertrain = powertrain;
                score1C3.CockpitControlsBrakesSafety = cockpitcontrolsbrakessafety;
                score1C3.SystemManagementIntegration = systemmanagementintegration;
                score1C3.ManufacturabilityServiceability = manufacturabilityserviceability;
                score1C3.AestheticsStyle = aestheticsstyle;
                score1C3.Creativity = creativity;
                score1C3.CarWeight = carweight;

                score1C3.SuspensionNotes = suspensionnotes;
                score1C3.FrameBodyAeroNotes = framebodyaeronotes;
                score1C3.PowertrainNotes = powertrainnotes;
                score1C3.CockpitControlsBrakesSafetyNotes = cockpitcontrolsbrakessafetynotes;
                score1C3.SystemManagementIntegrationNotes = systemmanagementintegrationnotes;
                score1C3.ManufacturabilityServiceabilityNotes = manufacturabilityserviceabilitynotes;
                score1C3.AestheticsStyleNotes = aestheticsstylenotes;
                score1C3.CreativityNotes = creativitynotes;

                score1C3.Miscellaneous = miscellaneous;
                score1C3.MiscellaneousNotes = miscellaneousnotes;

                context.ScoresDesign1C3.Add(score1C3);
                context.SaveChanges();

				//Update Total Score in the main table
				score.GivenScore = score1C3.RecalculateTotalScore();

                //SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
                if (score.GivenScore != overall)
                    score.GivenScore = overall;

                context.SaveChanges();

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Design1C3")]
        public bool UpdateScoreDesign1C3(int scoreid, int suspension, int framebodyaero, int powertrain, int cockpitcontrolsbrakessafety, int systemmanagementintegration, int manufacturabilityserviceability, int aestheticsstyle, int creativity, int carweight, int overall, string suspensionnotes, string framebodyaeronotes, string powertrainnotes, string cockpitcontrolsbrakessafetynotes, string systemmanagementintegrationnotes, string manufacturabilityserviceabilitynotes, string aestheticsstylenotes, string creativitynotes, int miscellaneous, string miscellaneousnotes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreDesign1C3 score1C3 = context.ScoresDesign1C3.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score1C3 != null)
                {
                    score1C3.Suspension = suspension;
                    score1C3.FrameBodyAero = framebodyaero;
                    score1C3.Powertrain = powertrain;
                    score1C3.CockpitControlsBrakesSafety = cockpitcontrolsbrakessafety;
                    score1C3.SystemManagementIntegration = systemmanagementintegration;
                    score1C3.ManufacturabilityServiceability = manufacturabilityserviceability;
                    score1C3.AestheticsStyle = aestheticsstyle;
                    score1C3.Creativity = creativity;
                    score1C3.CarWeight = carweight;

                    score1C3.SuspensionNotes = suspensionnotes;
                    score1C3.FrameBodyAeroNotes = framebodyaeronotes;
                    score1C3.PowertrainNotes = powertrainnotes;
                    score1C3.CockpitControlsBrakesSafetyNotes = cockpitcontrolsbrakessafetynotes;
                    score1C3.SystemManagementIntegrationNotes = systemmanagementintegrationnotes;
                    score1C3.ManufacturabilityServiceabilityNotes = manufacturabilityserviceabilitynotes;
                    score1C3.AestheticsStyleNotes = aestheticsstylenotes;
                    score1C3.CreativityNotes = creativitynotes;

                    score1C3.Miscellaneous = miscellaneous;
                    score1C3.MiscellaneousNotes = miscellaneousnotes;

                    context.SaveChanges();

					//Update Total Score in the main table
					score1C3.Score.GivenScore = score1C3.RecalculateTotalScore();

                    //SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
                    if (score1C3.Score.GivenScore != overall)
                        score1C3.Score.GivenScore = overall;

                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Design1C3")]
        public bool DeleteScoreDesign1C3(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreDesign1C3 score1C3 = context.ScoresDesign1C3.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score1C3 != null)
                {
                    context.ScoresDesign1C3.Remove(score1C3);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        #endregion

        #region ScorePresentation
        [WebMethod(Description = "Get All Scores Presentation")]
        public List<ScorePresentation> GetScoresPresentation()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;
            List<ScorePresentation> scoresPresentation = context.ScoresPresentation.Include("Score").ToList();
            return scoresPresentation;
        }

        [WebMethod(Description = "Get Score Presentation by scoreid")]
        public ScorePresentation GetScorePresentation(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScorePresentation scorePresentation = context.ScoresPresentation.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scorePresentation;
        }

		//Event 2019 - Presentation Event has been changed
		[WebMethod(Description = "Insert Score Presentation")]
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
		public bool InsertScorePresentation(int eventid, int carid, int scoreid,
			//double [] executiveSummary, string executiveSummaryNotes,
			double [] novelty,						string noveltyNotes,
			double [] content,						string contentNotes,
			double [] finances,						string financesNotes,
			double [] deepDiveTopic,				string deepDiveTopicNotes,
			double [] demonstrationAndStructure,	string demonstrationAndStructureNotes,
			double [] delivery,						string deliveryNotes,
			double [] questions,					string questionsNotes,
			double [] generalImpression,			string generalImpressionNotes,
			double    miscellaneous,				string miscellaneousNotes,
            string    presentationNotes,			double totalPresentation,
			//FD 2021.07.27 - ATA 2021  - Add Stage1
			double    stage1,
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
			double [] demonstrationAndDelivery,		string demonstrationAndDeliveryNotes,

            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //FDT - ATA 2023 - eliminato Business Figures - INIZIO
            //double[] st2BusinessFigure,				string st2BusinessFigureNotes,
            //FDT - ATA 2023 - eliminato Business Figures - FINE
            //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
            double[] st2FinConcept,                 string st2FinConceptNotes,
            //FDT - ATA 2023 - aggiunto Financial Concept - FINE
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
            double[] st2FinKPIs,                    string st2FinKPIsNotes,
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //double[] st2Content,					string st2ContentNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            double[] st2DemonstrationAndDelivery,	string st2DemonstrationAndDeliveryNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //double[] st2Investitors,				string st2InvestitorsNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

            //FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
            double finals
			)
		{
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
				ScorePresentation scoreP = new ScorePresentation();

                scoreP.Score = score;

				//FD 2021.07.27 - ATA 2021  - Add Stage1
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
				//scoreP.SetData(executiveSummary, executiveSummaryNotes, novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1);
				//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
				//scoreP.SetData(novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1);
				//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
				//scoreP.SetData(novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1, demonstrationAndDelivery, demonstrationAndDeliveryNotes);
				//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
				//scoreP.SetData(novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1, demonstrationAndDelivery, demonstrationAndDeliveryNotes,st2BusinessFigure, st2BusinessFigureNotes, st2Content, st2ContentNotes,st2DemonstrationAndDelivery, st2DemonstrationAndDeliveryNotes,st2Investitors,	st2InvestitorsNotes,0);
				scoreP.SetData(	novelty,						noveltyNotes,	
								content,						contentNotes, 
								finances,						financesNotes,	
								deepDiveTopic,					deepDiveTopicNotes,
								demonstrationAndStructure,		demonstrationAndStructureNotes,
								delivery,						deliveryNotes,
								questions,						questionsNotes,
								generalImpression,				generalImpressionNotes,
								miscellaneous,					miscellaneousNotes,
								presentationNotes, 
								stage1,
								demonstrationAndDelivery,		demonstrationAndDeliveryNotes,
                                //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                                //st2BusinessFigure,				st2BusinessFigureNotes,
                                //FDT - ATA 2023 - eliminato Business Figures - FINE
                                //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                                st2FinConcept,                  st2FinConceptNotes,
                                //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                                st2FinKPIs,                     st2FinKPIsNotes,
                                //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                                //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                //st2Content,						st2ContentNotes,
                                //FDT - ATA 2023 - eliminato Content e Investors - FINE
                                st2DemonstrationAndDelivery,	st2DemonstrationAndDeliveryNotes,
                                //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                //st2Investitors,					st2InvestitorsNotes,
                                //FDT - ATA 2023 - eliminato Content e Investors - FINE
                                finals);

				context.ScoresPresentation.Add(scoreP);
                context.SaveChanges();

				//Update Total Score in the main table
				score.GivenScore = scoreP.RecalculateTotalScore();
				//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
				score.FinalsScore = scoreP.RecalculateFinalsScore();

				//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
				if (score.GivenScore != totalPresentation)
                    score.GivenScore = totalPresentation;

                context.SaveChanges();

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }
        }

		//Event 2019 - Presentation Event has been changed
		[WebMethod(Description = "Update Score Presentation")]
		//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
        public bool UpdateScorePresentation(int scoreid,
			//double[] executiveSummary,				string executiveSummaryNotes,
			double[] novelty,							string noveltyNotes,
			double[] content,							string contentNotes,
			double[] finances,							string financesNotes,
			double[] deepDiveTopic,						string deepDiveTopicNotes,
			double[] demonstrationAndStructure,			string demonstrationAndStructureNotes,
			double[] delivery,							string deliveryNotes,
			double[] questions,							string questionsNotes,
			double[] generalImpression,					string generalImpressionNotes,
			double miscellaneous,						string miscellaneousNotes,
			string presentationNotes,					double totalPresentation
			//FD 2021.07.27 - ATA 2021  - Add Stage1
			,double stage1
			//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
			,double[] demonstrationAndDelivery,			string demonstrationAndDeliveryNotes,

            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
            //FDT - ATA 2023 - eliminato Business Figures - INIZIO
            //double[] st2BusinessFigure,					string st2BusinessFigureNotes,
            //FDT - ATA 2023 - eliminato Business Figures - FINE
            //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
            double[] st2FinConcept,                     string st2FinConceptNotes,
            //FDT - ATA 2023 - aggiunto Financial Concept - FINE
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
            double[] st2FinKPIs,                        string st2FinKPIsNotes,
            //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //double[] st2Content,						string st2ContentNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            double[] st2DemonstrationAndDelivery,		string st2DemonstrationAndDeliveryNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
            //double[] st2Investitors,					string st2InvestitorsNotes,
            //FDT - ATA 2023 - eliminato Content e Investors - FINE
            //FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

            //FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
            double finals
			)
		{
			try
            {
                ATA_Context context = new ATA_Context();

                context.Configuration.LazyLoadingEnabled = false;
                context.Configuration.ProxyCreationEnabled = false;

                ScorePresentation scoreP = context.ScoresPresentation.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreP != null)
                {
					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
					//scoreP.SetData(executiveSummary, executiveSummaryNotes, novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1);
					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
					//scoreP.SetData(novelty, noveltyNotes, content, contentNotes, finances, financesNotes, deepDiveTopic, deepDiveTopicNotes, demonstrationAndStructure, demonstrationAndStructureNotes, delivery, deliveryNotes, questions, questionsNotes, generalImpression, generalImpressionNotes, miscellaneous, miscellaneousNotes, presentationNotes, stage1);
					scoreP.SetData(	novelty,						noveltyNotes, 
									content,						contentNotes, 
									finances,						financesNotes, 
									deepDiveTopic,					deepDiveTopicNotes, 
									demonstrationAndStructure,		demonstrationAndStructureNotes, 
									delivery,						deliveryNotes, 
									questions,						questionsNotes, 
									generalImpression,				generalImpressionNotes, 
									miscellaneous,					miscellaneousNotes, 
									presentationNotes,				stage1, 
									demonstrationAndDelivery,		demonstrationAndDeliveryNotes,
                                    //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                                    //st2BusinessFigure,				st2BusinessFigureNotes,
                                    //FDT - ATA 2023 - eliminato Business Figures - INIZIO
                                    //FDT - ATA 2023 - aggiunto Financial Concept - INIZIO
                                    st2FinConcept,                  st2FinConceptNotes,
                                    //FDT - ATA 2023 - aggiunto Financial Concept - FINE
                                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - INIZIO
                                    st2FinKPIs,                     st2FinKPIsNotes,
                                    //FDT - ATA 2023 - aggiunto Financial KPIs & insights - FINE
                                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                    //st2Content,						st2ContentNotes,
                                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                                    st2DemonstrationAndDelivery,	st2DemonstrationAndDeliveryNotes,
                                    //FDT - ATA 2023 - eliminato Content e Investors - INIZIO
                                    //st2Investitors,					st2InvestitorsNotes,
                                    //FDT - ATA 2023 - eliminato Content e Investors - FINE
                                    finals
                            );

					context.SaveChanges();

					//Update Total Score in the main table
					scoreP.Score.GivenScore		= scoreP.RecalculateTotalScore();
					//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
					scoreP.Score.FinalsScore	= scoreP.RecalculateFinalsScore();

					//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
					if (scoreP.Score.GivenScore != totalPresentation)
                        scoreP.Score.GivenScore = totalPresentation;
					//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
					scoreP.Score.FinalsScore = scoreP.RecalculateFinalsScore();

                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Presentation")]
        public bool DeleteScorePresentation(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScorePresentation scoreP = context.ScoresPresentation.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreP != null)
                {
                    context.ScoresPresentation.Remove(scoreP);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

		//Event 2019 - Presentation Event has been changed
		[WebMethod(Description = "Calculate Score Presentation")]
        public List<RankingObject> CalculateScorePresentation(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<RankingObject> ranks = new List<RankingObject>();
            List<Score> myscores = new List<Score>();
            List<Score> myscoresDuplicatedRecords = new List<Score>();
            try
            {
                myscoresDuplicatedRecords = context.Scores.Where(d => d.Event.EventName.Id == 1 && d.Car.Class.Id.Equals(classId)).ToList();

                List<Car> myCarsInScores = new List<Car>();
                foreach (Score c in myscoresDuplicatedRecords)
                {
                    if (myCarsInScores.Where(d => d.Id.Equals(c.Car.Id)).Count() == 0)
                        myCarsInScores.Add(context.Cars.Where(d => d.Id.Equals(c.Car.Id)).FirstOrDefault());
                }
                Score scoreToAdd;
                foreach (Car c in myCarsInScores)
                {
                    scoreToAdd = new Score();
                    scoreToAdd = myscoresDuplicatedRecords.Where(d => d.Car.Id.Equals(c.Id)).OrderByDescending(d => d.Id).FirstOrDefault();

                    if (scoreToAdd != null)
                        myscores.Add(scoreToAdd);
                }

                if (myscores.Count == 0)
                    return ranks;


                RankingObject myrank;
                double max = myscores.Max(d => d.GivenScore);
                double maxTerzo = 0;
                if (myscores.Count() > 2)
                {
                    maxTerzo = myscores.OrderByDescending(d => d.GivenScore).Skip(2).Max(d => d.GivenScore);
                }
                
                double maximumScore = context.Events.Where(f => f.EventName.Id.Equals(1)).FirstOrDefault().MaximumScore;
                List<ScorePresentation> myScorePresent = new List<ScorePresentation>();
                myScorePresent = context.ScoresPresentation.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();

                foreach (ScorePresentation scoreP in myScorePresent)
                {
					//Event 2017 - Why updating only when is set to zero?
					//if (scoreP.Score.GivenScore == 0)
					//{
						scoreP.Score.GivenScore		= scoreP.RecalculateTotalScore();
						//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
						scoreP.Score.FinalsScore	= scoreP.RecalculateFinalsScore();
                    //}
                }

                var index = 0;
                foreach (Score s in myscores.OrderByDescending(x => x.GivenScore))
                {
                    index++;
                    myrank = new RankingObject();
                    myrank.ScoreValue = s.GivenScore;
                    myrank.RegNum = s.Car.Regno;
                    myrank.CarNum = s.Car.Carno;
                    myrank.TeamId = s.Car.Team.Id;
                    myrank.TeamName = s.Car.Team.Name;
                    myrank.University = s.Car.Team.University;

					//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
					myrank.FinalsScore = s.FinalsScore;

                    if (index <= 3)
                    {
                        if (max != 0)
                            myrank.NormalizedScore = maximumScore;
                            //myrank.NormalizedScore = Math.Round(s.GivenScore * maximumScore / max, 3);
                    }
                    else
                    {
                        if (maxTerzo != 0)
                            myrank.NormalizedScore = Math.Round(s.GivenScore * maximumScore / maxTerzo, 3);
                    }

                    //AF - Lug 2016 - Added Notes for Presentation
                    ScorePresentation scoreP = context.ScoresPresentation.Where(sp => sp.Score.Id.Equals(s.Id)).FirstOrDefault();

					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
					//myrank.Notes.Add(scoreP.ExecutiveSummaryNotes.ToString());
					myrank.Notes.Add(scoreP.NoveltyNotes.ToString());
					myrank.Notes.Add(scoreP.ContentNotes.ToString());
					myrank.Notes.Add(scoreP.FinancesNotes.ToString());
					myrank.Notes.Add(scoreP.DeepDiveTopicNotes.ToString());
					
					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
					myrank.Notes.Add(scoreP.DemonstrationAndDeliveryNotes.ToString());

					//myrank.Notes.Add(scoreP.DemonstrationAndStructureNotes.ToString());
					myrank.Notes.Add(scoreP.DeliveryNotes.ToString());
					myrank.Notes.Add(scoreP.QuestionsNotes.ToString());
					myrank.Notes.Add(scoreP.GeneralImpressionNotes.ToString());
					myrank.Notes.Add(scoreP.MiscellaneousNotes.ToString());
					myrank.Notes.Add(scoreP.PresentationNotes.ToString());

                    ranks.Add(myrank);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<RankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();
        }


        #endregion

        #region ScoreCost

        [WebMethod(Description = "Get All Scores Cost")]
        public List<ScoreCost> GetScoresCost()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<ScoreCost> scoreCost1E = context.ScoresCost.Include("Score").ToList();
            return scoreCost1E;
        }

        [WebMethod(Description = "Get Score Cost by scoreid")]
        public ScoreCost GetScoreCost(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            ScoreCost scoreCost1E = context.ScoresCost.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreCost1E;
        }

        [WebMethod(Description = "Insert Score Cost")]
        public bool InsertScoreCost(int eventid, int carid, int scoreid, double costBeforeAddendum, double addendumAdjustment, double cost, double costPoint, double visualInspection, double visualInspectionPoint, double eventDay, double eventDayPoint, double penalities, double delayPenalities, double scoreNotWiegjted, double scoreValue, string notes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreCost scoreC = new ScoreCost();

                scoreC.Score = score;
                scoreC.AddendumAdjustment = addendumAdjustment;
                scoreC.Cost = cost;
                scoreC.CostBeforeAddendum = costBeforeAddendum;
                scoreC.CostPoint = costPoint;
                scoreC.DelayPenalities = delayPenalities;
                scoreC.EventDay = eventDay;
                scoreC.EventDayPoint = eventDayPoint;
                scoreC.Penalities = penalities;
                scoreC.ScoreNotWiegjted = scoreNotWiegjted;
                scoreC.ScoreValue = scoreValue;
                scoreC.VisualInspection = visualInspection;
                scoreC.VisualInspectionPoint = visualInspectionPoint;
                scoreC.Notes = notes;

                context.ScoresCost.Add(scoreC);

                score.GivenScore = scoreC.ScoreValue;

                CalculateScoreCost(scoreC.Score.Car.Class.Id);
                context.SaveChanges();

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Cost")]
        public bool UpdateScoreCost(int scoreid, double costBeforeAddendum, double addendumAdjustment, double cost, double costPoint, double visualInspection, double visualInspectionPoint, double eventDay, double eventDayPoint, double penalities, double delayPenalities, double scoreNotWiegjted, double scoreValue, string notes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreCost scoreC = context.ScoresCost.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreC != null)
                {
                    scoreC.CostBeforeAddendum = costBeforeAddendum;
                    scoreC.AddendumAdjustment = addendumAdjustment;
                    scoreC.Cost = cost;
                    scoreC.CostPoint = costPoint;
                    scoreC.VisualInspection = visualInspection;
                    scoreC.VisualInspectionPoint = visualInspectionPoint;
                    scoreC.EventDay = eventDay;
                    scoreC.EventDayPoint = eventDayPoint;
                    scoreC.Penalities = penalities;
                    scoreC.DelayPenalities = delayPenalities;
                    scoreC.ScoreNotWiegjted = scoreNotWiegjted;
                    scoreC.ScoreValue = scoreValue;
                    scoreC.Notes = notes;

                    Score myscore = context.Scores.Where(d => d.Id == scoreid).FirstOrDefault();
                    myscore.GivenScore = scoreC.ScoreValue;
                    CalculateScoreCost(scoreC.Score.Car.Class.Id);

                    context.SaveChanges();

                    return true;
                }
                else
                {
                    Score myscore = context.Scores.Where(d => d.Id == scoreid).FirstOrDefault();
                    if (myscore != null)
                    {
                        InsertScoreCost(myscore.Event.Id, myscore.Car.Id, scoreid, costBeforeAddendum, addendumAdjustment, cost, costPoint, visualInspection, visualInspectionPoint, eventDay, eventDayPoint, penalities, delayPenalities, scoreNotWiegjted, scoreValue, notes);
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Cost")]
        public bool DeleteScoreCost(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreCost scoreC = context.ScoresCost.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreC != null)
                {
                    context.ScoresCost.Remove(scoreC);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score Cost")]
        public List<RankingObject> CalculateScoreCost(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<RankingObject> ranks = new List<RankingObject>();
            try
            {

                double max, min, maxScoreNotWiegjted;
                List<ScoreCost> myScoresCosts = new List<ScoreCost>();
                myScoresCosts = context.ScoresCost.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();

                foreach (ScoreCost i in myScoresCosts)
                {
                    i.Cost = i.AddendumAdjustment + i.CostBeforeAddendum;
                }
                max = myScoresCosts.Max(d => d.Cost);
                //    min = myScores.Min(d => d.Cost);
                ScoreCost ScoreForMin = myScoresCosts.Where(d => d.Cost > 0).OrderBy(d => d.Cost).FirstOrDefault();
                if (ScoreForMin != null)
                    min = ScoreForMin.Cost;
                else
                    min = 0;
                foreach (ScoreCost i in myScoresCosts)
                {
                    i.CostPoint = calculateCostPoint(max, min, i.Cost);
                    i.VisualInspectionPoint = i.VisualInspection;
                    i.EventDayPoint = i.EventDay;
                    i.ScoreNotWiegjted = i.CostPoint + i.VisualInspection + i.EventDayPoint - (i.Penalities + i.DelayPenalities);
                    if (i.ScoreNotWiegjted < 0)
                        i.ScoreNotWiegjted = 0;
                }

                maxScoreNotWiegjted = myScoresCosts.Max(d => d.ScoreNotWiegjted);
                RankingObject MyRank;
                Score myScore;
                double MaxScoreCost = myScoresCosts.Max(d => d.ScoreValue);
                double maximumScore = context.Events.Where(f => f.EventName.Id.Equals(2)).FirstOrDefault().MaximumScore;
                foreach (ScoreCost i in myScoresCosts)
                {
                    i.ScoreValue = (i.ScoreNotWiegjted / maxScoreNotWiegjted) * 100;
                    MyRank = new RankingObject();
                    myScore = context.Scores.Where(d => d.Id == i.Score.Id).FirstOrDefault();
                    if (myScore != null)
                        myScore.GivenScore = Math.Round(i.ScoreValue, 3);
                    MyRank.ScoreValue = Math.Round(i.ScoreValue, 3);
                    MyRank.NormalizedScore = Math.Round(i.ScoreValue * maximumScore / MaxScoreCost);
                    MyRank.CarNum = myScore.Car.Carno;
                    MyRank.RegNum = myScore.Car.Regno;
                    MyRank.TeamId = myScore.Car.Team.Id;
                    MyRank.TeamName = myScore.Car.Team.Name;
                    MyRank.University = myScore.Car.Team.University;

                    ranks.Add(MyRank);
                }

                context.SaveChanges();

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<RankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();

        }

        private double calculateCostPoint(double max, double min, double cost)
        {
            double ret = 0;
            if (min != 0 && cost > 1)
            {
                ret = 40 * (max / cost - 1) / (max / min - 1);
                if (ret < 0)
                    ret = 0;
            }

            return ret;
        }


        #endregion

        #region ScoreCost2015

        [WebMethod(Description = "Get All Scores Cost")]
        public List<ScoreCost_2015> GetScoresCost2015()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            List<ScoreCost_2015> sc = context.ScoresCost_2015.Include("Score").ToList();
            return sc;
        }

        [WebMethod(Description = "Get Score Cost by scoreid")]
        public ScoreCost_2015 GetScoreCost2015(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;

            ScoreCost_2015 scoreCost1E = context.ScoresCost_2015.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreCost1E;
        }

        [WebMethod(Description = "Insert Score Cost")]
        public bool InsertScoreCost2015(int eventid, int carid, int scoreid, double lowestCost, double accuracy, double eventDay, double penalties, double presentation, string Notes)
        {

            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreCost_2015 scoreC = new ScoreCost_2015();

                scoreC.Score = score;
                scoreC.LowerstCost = lowestCost;
                scoreC.Accuracy = accuracy;
                scoreC.EventDay = eventDay;
                scoreC.Penalties = penalties;
                scoreC.Presentation = presentation;
                scoreC.Notes = Notes;
                scoreC.TotalAchivedPoints = lowestCost + accuracy + eventDay + presentation - penalties;
                context.ScoresCost_2015.Add(scoreC);

                score.GivenScore = scoreC.TotalAchivedPoints;
                context.SaveChanges();

                CalculateScoreCost2015(scoreC.Score.Car.Class.Id);

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Cost")]
        public bool UpdateScoreCost2015(int scoreid, double lowestCost, double accuracy, double eventDay, double penalties, double presentation, string Notes)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreCost_2015 scoreC = context.ScoresCost_2015.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreC != null)
                {
                    scoreC.LowerstCost = lowestCost;
                    scoreC.Accuracy = accuracy;
                    scoreC.EventDay = eventDay;
                    scoreC.Penalties = penalties;
                    scoreC.Presentation = presentation;
                    scoreC.Notes = Notes;
                    scoreC.TotalAchivedPoints = lowestCost + accuracy + eventDay + presentation - penalties;
                    scoreC.Score.GivenScore = scoreC.TotalAchivedPoints;

                    context.SaveChanges();

                    CalculateScoreCost2015(scoreC.Score.Car.Class.Id);

                    return true;
                }
                else
                {
                    Score myscore = context.Scores.Where(d => d.Id == scoreid).FirstOrDefault();
                    if (myscore != null)
                    {
                        InsertScoreCost2015(myscore.Event.Id, myscore.Car.Id, scoreid, lowestCost, accuracy, eventDay, penalties, presentation, Notes);
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Cost")]
        public bool DeleteScoreCost2015(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreCost_2015 scoreC = context.ScoresCost_2015.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreC != null)
                {
                    context.ScoresCost_2015.Remove(scoreC);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }


        [WebMethod(Description = "Calculate Score Cost 2015")]
        public List<RankingObject> CalculateScoreCost2015(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<RankingObject> ranks = new List<RankingObject>();
            try
            {

                List<ScoreCost_2015> myScores = new List<ScoreCost_2015>();
                List<ScoreCost_2015> myscoresDuplicatedRecords = new List<ScoreCost_2015>();
                RankingObject MyRank;
                myscoresDuplicatedRecords = context.ScoresCost_2015.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();

                List<Car> myCarsInScores = new List<Car>();
                foreach (ScoreCost_2015 c in myscoresDuplicatedRecords)
                {
                    if (myCarsInScores.Where(d => d.Id.Equals(c.Score.Car.Id)).Count() == 0)
                        myCarsInScores.Add(context.Cars.Where(d => d.Id.Equals(c.Score.Car.Id)).FirstOrDefault());
                }
                ScoreCost_2015 scoreToAdd;
                foreach (Car c in myCarsInScores)
                {
                    scoreToAdd = new ScoreCost_2015();
                    scoreToAdd = myscoresDuplicatedRecords.Where(d => d.Score.Car.Id.Equals(c.Id)).OrderByDescending(d => d.Id).FirstOrDefault();

                    if (scoreToAdd != null)
                        myScores.Add(scoreToAdd);
                }

                if (myScores.Count == 0)
                    return ranks;

                double max = 0;
                double maximumScore = context.Events.Where(f => f.Id.Equals(2)).FirstOrDefault().MaximumScore;
                ScoreCost_2015 CostForMax = myScores.Where(d => d.TotalAchivedPoints > 0).OrderByDescending(d => d.TotalAchivedPoints).FirstOrDefault();
                if (CostForMax != null)
                    max = CostForMax.TotalAchivedPoints;

                if (myScores != null && max > 0)
                {

                    foreach (ScoreCost_2015 c in myScores)
                    {
                        c.TotalAchivedPoints = c.LowerstCost + c.Accuracy + c.EventDay + c.Presentation - c.Penalties;
                        if (max != 0)
                            c.NormalizedScore = Math.Round(maximumScore * c.TotalAchivedPoints / max, 3);

                        //Event 2017 - Why updating only when is set to zero?
                        //if (c.Score.GivenScore == 0)
                        c.Score.GivenScore = c.TotalAchivedPoints;
                    }
                }
                context.SaveChanges();
                foreach (ScoreCost_2015 i in myScores)
                {
                    MyRank = new RankingObject();
                    MyRank.ScoreValue = Math.Round(i.TotalAchivedPoints, 3);
                    MyRank.NormalizedScore = Math.Round(i.NormalizedScore, 3);
                    MyRank.CarNum = i.Score.Car.Carno;
                    MyRank.RegNum = i.Score.Car.Regno;
                    MyRank.TeamId = i.Score.Car.Team.Id;
                    MyRank.TeamName = i.Score.Car.Team.Name;
                    MyRank.University = i.Score.Car.Team.University;

                    ranks.Add(MyRank);
                }

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<RankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();

        }


        #endregion

        #region ScoreAcceleration
        [WebMethod(Description = "Get All Scores Acceleration")]
        public List<ScoreAcceleration> GetScoresAcceleration()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            List<ScoreAcceleration> scoresAcceleration = context.ScoresAcceleration.Include("Score").ToList();
            return scoresAcceleration;
        }

        [WebMethod(Description = "Get Score Acceleration by scoreid")]
        public ScoreAcceleration GetScoreAcceleration(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScoreAcceleration scoreAcceleration = context.ScoresAcceleration.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreAcceleration;
        }

        [WebMethod(Description = "Insert Score Acceleration")]
        public bool InsertScoreAcceleration(int eventid, int carid, int scoreid, double r1Time, int r1Cones, double r2Time, int r2Cones, double r3Time, int r3Cones, double r4Time, int r4Cones)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreAcceleration scoreACC = new ScoreAcceleration();

                scoreACC.Score = score;

                scoreACC.Run1Time = r1Time;
                scoreACC.Run1NumOfCones = r1Cones;

                scoreACC.Run2Time = r2Time;
                scoreACC.Run2NumOfCones = r2Cones;

                scoreACC.Run3Time = r3Time;
                scoreACC.Run3NumOfCones = r3Cones;

                scoreACC.Run4Time = r4Time;
                scoreACC.Run4NumOfCones = r4Cones;

                scoreACC.CalculateAdjTimes();
                scoreACC.CalculateBestTime();

                context.ScoresAcceleration.Add(scoreACC);
                context.SaveChanges();

                CalculateScoreAcceleration(scoreACC.Score.Car.Class.Id);

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Acceleration")]
        public bool UpdateScoreAcceleration(int scoreid, double r1Time, int r1Cones, double r2Time, int r2Cones, double r3Time, int r3Cones, double r4Time, int r4Cones)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreAcceleration scoreACC = context.ScoresAcceleration.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreACC != null)
                {
                    scoreACC.Run1Time = r1Time;
                    scoreACC.Run1NumOfCones = r1Cones;

                    scoreACC.Run2Time = r2Time;
                    scoreACC.Run2NumOfCones = r2Cones;

                    scoreACC.Run3Time = r3Time;
                    scoreACC.Run3NumOfCones = r3Cones;

                    scoreACC.Run4Time = r4Time;
                    scoreACC.Run4NumOfCones = r4Cones;

                    scoreACC.CalculateAdjTimes();
                    scoreACC.CalculateBestTime();

                    context.SaveChanges();


                    CalculateScoreAcceleration(scoreACC.Score.Car.Class.Id);

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Acceleration")]
        public bool DeleteScoreAcceleration(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreAcceleration scoreACC = context.ScoresAcceleration.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreACC != null)
                {
                    context.ScoresAcceleration.Remove(scoreACC);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score Acceleration")]
        public List<DynamicRankingObject> CalculateScoreAcceleration(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<DynamicRankingObject> ranks = new List<DynamicRankingObject>();
            try
            {
                double max, min;
                List<ScoreAcceleration> myScoresAcc = new List<ScoreAcceleration>();
                myScoresAcc = context.ScoresAcceleration.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();
                foreach (ScoreAcceleration i in myScoresAcc)
                {
                    i.Run1TimeAdj = i.Run1Time + (i.Run1NumOfCones * 2);
                    i.Run2TimeAdj = i.Run2Time + (i.Run2NumOfCones * 2);
                    i.Run3TimeAdj = i.Run3Time + (i.Run3NumOfCones * 2);
                    i.Run4TimeAdj = i.Run4Time + (i.Run4NumOfCones * 2);
                    List<double> r = new List<double>();
                    if (i.Run1TimeAdj != 0)
                        r.Add(i.Run1TimeAdj);
                    if (i.Run2TimeAdj != 0)
                        r.Add(i.Run2TimeAdj);
                    if (i.Run3TimeAdj != 0)
                        r.Add(i.Run3TimeAdj);
                    if (i.Run4TimeAdj != 0)
                        r.Add(i.Run4TimeAdj);
                    if (r.Count > 0)
                        i.BestTime = r.Min();
                    else
                        i.BestTime = 0;
                }
                var item = myScoresAcc.Where(d => d.BestTime > 0).OrderBy(d => d.BestTime).FirstOrDefault();
                if (item != null)
                    min = item.BestTime;
                else
                    min = 0;
                //  min = myScoresAcc.Min(d => d.BestTime);
                max = 1.5 * min; // excel formula. don't know why

                DynamicRankingObject MyRank;
                double a, b, c;
                c = 0;

                foreach (ScoreAcceleration i in myScoresAcc)
                {
                    if (i.BestTime > 0)
                    {
                        a = (max / i.BestTime) - 1;
                        b = (max / min) - 1;
                        //Event 2017 - Update Formulas
                        //c = 71.5 * a / b + 3.5;
                        //if (c < 3.5)
                        //    c = 3.5;
                        //FDT - ATA 2023 - modifiche formula - INIZIO
                        //c = 95.5 * a / b + 4.5;
                        c = 71.5 * a / b + 3.5;                        
                        if (c < 3.5)
                            c = 3.5;
                        //FDT - ATA 2023 - modifiche formula - FINE
                    }
                    else
                        c = 0;

                    i.Score.GivenScore = Math.Round(c, 3); ;
                }

                foreach (ScoreAcceleration i in myScoresAcc)
                {
                    MyRank = new DynamicRankingObject();
                    MyRank.ScoreValue = i.Score.GivenScore;
                    MyRank.BestTime = i.BestTime;
                    MyRank.CarNum = i.Score.Car.Carno;
                    MyRank.RegNum = i.Score.Car.Regno;
                    MyRank.TeamId = i.Score.Car.Team.Id;
                    MyRank.TeamName = i.Score.Car.Team.Name;
                    MyRank.University = i.Score.Car.Team.University;
                    MyRank.Run1Time = i.Run1Time;
                    MyRank.Run1TimeAdj = i.Run1TimeAdj;
                    MyRank.Run1NumCones = i.Run1NumOfCones;
                    MyRank.Run2Time = i.Run2Time;
                    MyRank.Run2TimeAdj = i.Run2TimeAdj;
                    MyRank.Run2NumCones = i.Run2NumOfCones;
                    MyRank.Run3Time = i.Run3Time;
                    MyRank.Run3TimeAdj = i.Run3TimeAdj;
                    MyRank.Run3NumCones = i.Run3NumOfCones;
                    MyRank.Run4Time = i.Run4Time;
                    MyRank.Run4TimeAdj = i.Run4TimeAdj;
                    MyRank.Run4NumCones = i.Run4NumOfCones;

                    ranks.Add(MyRank);
                    context.SaveChanges();
                }


            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<DynamicRankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();
        }

        #endregion

        #region ScoreSkidPad
        [WebMethod(Description = "Get All Scores SkidPad")]
        public List<ScoreSkidPad> GetScoresSkidPad()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            List<ScoreSkidPad> scoresSkidPad = context.ScoresSkidPad.Include("Score").ToList();
            return scoresSkidPad;
        }

        [WebMethod(Description = "Get Score SkidPad by scoreid")]
        public ScoreSkidPad GetScoreSkidPad(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScoreSkidPad scoreSkidPad = context.ScoresSkidPad.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreSkidPad;
        }

        [WebMethod(Description = "Insert Score SkidPad")]
        public bool InsertScoreSkidPad(int eventid, int carid, int scoreid, double r1Time, int r1Cones, double r2Time, int r2Cones, double r3Time, int r3Cones, double r4Time, int r4Cones)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreSkidPad scoreSP = new ScoreSkidPad();

                scoreSP.Score = score;

                scoreSP.Run1Time = r1Time;
                scoreSP.Run1NumOfCones = r1Cones;

                scoreSP.Run2Time = r2Time;
                scoreSP.Run2NumOfCones = r2Cones;

                scoreSP.Run3Time = r3Time;
                scoreSP.Run3NumOfCones = r3Cones;

                scoreSP.Run4Time = r4Time;
                scoreSP.Run4NumOfCones = r4Cones;

                scoreSP.CalculateAdjTimes();
                scoreSP.CalculateBestTime();

                context.ScoresSkidPad.Add(scoreSP);
                context.SaveChanges();

                CalculateScoreSkidPad(scoreSP.Score.Car.Class.Id);

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score SkidPad")]
        public bool UpdateScoreSkidPad(int scoreid, double r1Time, int r1Cones, double r2Time, int r2Cones, double r3Time, int r3Cones, double r4Time, int r4Cones)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreSkidPad scoreSP = context.ScoresSkidPad.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreSP != null)
                {
                    scoreSP.Run1Time = r1Time;
                    scoreSP.Run1NumOfCones = r1Cones;

                    scoreSP.Run2Time = r2Time;
                    scoreSP.Run2NumOfCones = r2Cones;

                    scoreSP.Run3Time = r3Time;
                    scoreSP.Run3NumOfCones = r3Cones;

                    scoreSP.Run4Time = r4Time;
                    scoreSP.Run4NumOfCones = r4Cones;

                    scoreSP.CalculateAdjTimes();
                    scoreSP.CalculateBestTime();

                    context.SaveChanges();

                    CalculateScoreSkidPad(scoreSP.Score.Car.Class.Id);

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score SkidPad")]
        public bool DeleteScoreSkidPad(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreSkidPad scoreSP = context.ScoresSkidPad.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreSP != null)
                {
                    context.ScoresSkidPad.Remove(scoreSP);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score SkidPad")]
        public List<DynamicRankingObject> CalculateScoreSkidPad(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<DynamicRankingObject> ranks = new List<DynamicRankingObject>();
            try
            {
                double max, min;
                List<ScoreSkidPad> myScores = new List<ScoreSkidPad>();
                myScores = context.ScoresSkidPad.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();

                foreach (ScoreSkidPad i in myScores)
                {
					//Event 2019 - Was .25
                    i.Run1TimeAdj = i.Run1Time + (i.Run1NumOfCones * .125);
                    i.Run2TimeAdj = i.Run2Time + (i.Run2NumOfCones * .125);
                    i.Run3TimeAdj = i.Run3Time + (i.Run3NumOfCones * .125);
                    i.Run4TimeAdj = i.Run4Time + (i.Run4NumOfCones * .125);
                    List<double> r = new List<double>();
                    if (i.Run1TimeAdj != 0)
                        r.Add(i.Run1TimeAdj);
                    if (i.Run2TimeAdj != 0)
                        r.Add(i.Run2TimeAdj);
                    if (i.Run3TimeAdj != 0)
                        r.Add(i.Run3TimeAdj);
                    if (i.Run4TimeAdj != 0)
                        r.Add(i.Run4TimeAdj);
                    if (r.Count > 0)
                        i.BestTime = r.Min();
                    else
                        i.BestTime = 0;
                }
                var item = myScores.Where(d => d.BestTime > 0).OrderBy(d => d.BestTime).FirstOrDefault();
                if (item != null)
                    min = item.BestTime;
                else
                    min = 0;
                //  min = myScores.Min(d => d.BestTime);
                max = 1.25 * min; // excel formula. don't know why

                DynamicRankingObject MyRank;
                double a, b, c;
                c = 0;
                foreach (ScoreSkidPad i in myScores)
                {
                    if (i.BestTime > 0)
                    {
                        a = Math.Pow(max / i.BestTime, 2) - 1;
                        b = Math.Pow(max / min, 2) - 1;
                        //Event 2017 - Update Formulas
                        //c = 47.5 * (a / b) + 2.5;
                        //if (c < 2.5)
                        //    c = 2.5;
                        c = 71.5 * (a / b) + 3.5;
                        if (c < 3.5)
                            c = 3.5;
                    }
                    else
                        c = 0;


                    i.Score.GivenScore = c;

                }
                context.SaveChanges();
                foreach (ScoreSkidPad i in myScores)
                {
                    MyRank = new DynamicRankingObject();
                    MyRank.ScoreValue = Math.Round(i.Score.GivenScore, 3);
                    MyRank.BestTime = i.BestTime;
                    MyRank.CarNum = i.Score.Car.Carno;
                    MyRank.RegNum = i.Score.Car.Regno;
                    MyRank.TeamId = i.Score.Car.Team.Id;
                    MyRank.TeamName = i.Score.Car.Team.Name;
                    MyRank.University = i.Score.Car.Team.University;
                    MyRank.Run1Time = i.Run1Time;
                    MyRank.Run1TimeAdj = i.Run1TimeAdj;
                    MyRank.Run1NumCones = i.Run1NumOfCones;
                    MyRank.Run2Time = i.Run2Time;
                    MyRank.Run2TimeAdj = i.Run2TimeAdj;
                    MyRank.Run2NumCones = i.Run2NumOfCones;
                    MyRank.Run3Time = i.Run3Time;
                    MyRank.Run3TimeAdj = i.Run3TimeAdj;
                    MyRank.Run3NumCones = i.Run3NumOfCones;
                    MyRank.Run4Time = i.Run4Time;
                    MyRank.Run4TimeAdj = i.Run4TimeAdj;
                    MyRank.Run4NumCones = i.Run4NumOfCones;
                    
                    ranks.Add(MyRank);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<DynamicRankingObject>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();
        }

        #endregion

        #region ScoreAutoCross
        [WebMethod(Description = "Get All Scores AutoCross")]
        public List<ScoreAutoCross> GetScoresAutoCross()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            List<ScoreAutoCross> scoresAutoCross = context.ScoresAutoCross.Include("Score").ToList();
            return scoresAutoCross;
        }

        [WebMethod(Description = "Get Score AutoCross by scoreid")]
        public ScoreAutoCross GetScoreAutoCross(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScoreAutoCross scoreAutoCross = context.ScoresAutoCross.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreAutoCross;
        }

        [WebMethod(Description = "Insert Score AutoCross")]
        public bool InsertScoreAutoCross(int eventid, int carid, int scoreid, double r1Time, int r1Cones, int r1Doc, double r2Time, int r2Cones, int r2Doc, double r3Time, int r3Cones, int r3Doc, double r4Time, int r4Cones, int r4Doc)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreAutoCross scoreAC = new ScoreAutoCross();

                scoreAC.Score = score;

                scoreAC.Run1Time = r1Time;
                scoreAC.Run1NumOfCones = r1Cones;
                scoreAC.Run1Doc = r1Doc;

                scoreAC.Run2Time = r2Time;
                scoreAC.Run2NumOfCones = r2Cones;
                scoreAC.Run2Doc = r2Doc;

                scoreAC.Run3Time = r3Time;
                scoreAC.Run3NumOfCones = r3Cones;
                scoreAC.Run3Doc = r3Doc;

                scoreAC.Run4Time = r4Time;
                scoreAC.Run4NumOfCones = r4Cones;
                scoreAC.Run4Doc = r4Doc;

                scoreAC.CalculateAdjTimes();
                scoreAC.CalculateBestTime();

                context.ScoresAutoCross.Add(scoreAC);
                context.SaveChanges();

                CalculateScoreAutocross(scoreAC.Score.Car.Class.Id);

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score AutoCross")]
        public bool UpdateScoreAutoCross(int scoreid, double r1Time, int r1Cones, int r1Doc, double r2Time, int r2Cones, int r2Doc, double r3Time, int r3Cones, int r3Doc, double r4Time, int r4Cones, int r4Doc)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreAutoCross scoreAC = context.ScoresAutoCross.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreAC != null)
                {
                    scoreAC.Run1Time = r1Time;
                    scoreAC.Run1NumOfCones = r1Cones;
                    scoreAC.Run1Doc = r1Doc;

                    scoreAC.Run2Time = r2Time;
                    scoreAC.Run2NumOfCones = r2Cones;
                    scoreAC.Run2Doc = r2Doc;

                    scoreAC.Run3Time = r3Time;
                    scoreAC.Run3NumOfCones = r3Cones;
                    scoreAC.Run3Doc = r3Doc;

                    scoreAC.Run4Time = r4Time;
                    scoreAC.Run4NumOfCones = r4Cones;
                    scoreAC.Run4Doc = r4Doc;

                    scoreAC.CalculateAdjTimes();
                    scoreAC.CalculateBestTime();

                    context.SaveChanges();

                    CalculateScoreAutocross(scoreAC.Score.Car.Class.Id);

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score AutoCross")]
        public bool DeleteScoreAutoCross(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreAutoCross scoreAC = context.ScoresAutoCross.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (scoreAC != null)
                {
                    context.ScoresAutoCross.Remove(scoreAC);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score AutoCross")]
        public List<DynamicRankingObjectAutoCross> CalculateScoreAutocross(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<DynamicRankingObjectAutoCross> ranks = new List<DynamicRankingObjectAutoCross>();
            try
            {
                double max, min;
                min = 0;
                List<ScoreAutoCross> myScores = new List<ScoreAutoCross>();
                myScores = context.ScoresAutoCross.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList();

                foreach (ScoreAutoCross i in myScores)
                {
                    i.Run1TimeAdj = i.Run1Time + (i.Run1NumOfCones * 2) + (i.Run1Doc * 20);
                    i.Run2TimeAdj = i.Run2Time + (i.Run2NumOfCones * 2) + (i.Run2Doc * 20);
                    i.Run3TimeAdj = i.Run3Time + (i.Run3NumOfCones * 2) + (i.Run3Doc * 20);
                    i.Run4TimeAdj = i.Run4Time + (i.Run4NumOfCones * 2) + (i.Run4Doc * 20);

                    List<double> r = new List<double>();
                    if (i.Run1TimeAdj != 0)
                        r.Add(i.Run1TimeAdj);
                    if (i.Run2TimeAdj != 0)
                        r.Add(i.Run2TimeAdj);
                    if (i.Run3TimeAdj != 0)
                        r.Add(i.Run3TimeAdj);
                    if (i.Run4TimeAdj != 0)
                        r.Add(i.Run4TimeAdj);
                    if (r.Count > 0)
                        i.BestTime = r.Min();
                    else
                        i.BestTime = 0.0;
                }

                ScoreAutoCross MinScore = myScores.Where(d => d.BestTime > 0).OrderBy(d => d.BestTime).FirstOrDefault();
                if (MinScore != null)
                    min = MinScore.BestTime;

                //FDT - ATA 2023 - modifiche formula - INIZIO
                //max = 1.45 * min; // excel formula. don't know why
                max = 1.25 * min;
                //FDT - ATA 2023 - modifiche formula - FINE

                DynamicRankingObjectAutoCross MyRank;
                Score myScore;
                double a, b, c;
                c = 0;
                foreach (ScoreAutoCross i in myScores)
                {
                    if (i.BestTime > 0)
                    {
                        a = (max / i.BestTime) - 1;
                        b = (max / min) - 1;
                        //Event 2017 - Update Formula
                        //c = 142.5 * (a / b) + 7.5;
                        //if (c < 7.5)
                        //    c = 7.5;
                        //FDT - ATA 2023 - modifiche formula - INIZIO
                        //c = 118.5 * (a / b) + 6.5;
                        c = 95.5 * (a / b) + 4.5;                        
                        if (c < 4.5)
                            c = 4.5;
                        //FDT - ATA 2023 - modifiche formula - FINE
                    }
                    else
                        c = 0;

                    myScore = context.Scores.Where(d => d.Id == i.Score.Id).FirstOrDefault();
                    if (myScore != null)
                        myScore.GivenScore = Math.Round(c, 3);
                }

                context.SaveChanges();

                foreach (ScoreAutoCross i in myScores)
                {
                    MyRank = new DynamicRankingObjectAutoCross();
                    MyRank.ScoreValue = i.Score.GivenScore;
                    MyRank.BestTime = i.BestTime;
                    MyRank.CarNum = i.Score.Car.Carno;
                    MyRank.RegNum = i.Score.Car.Regno;
                    MyRank.TeamId = i.Score.Car.Team.Id;
                    MyRank.TeamName = i.Score.Car.Team.Name;
                    MyRank.University = i.Score.Car.Team.University;
                    MyRank.Run1Time = i.Run1Time;
                    MyRank.Run1TimeAdj = i.Run1TimeAdj;
                    MyRank.Run1NumCones = i.Run1NumOfCones;
                    MyRank.Run1Doc = i.Run1Doc;
                    MyRank.Run2Time = i.Run2Time;
                    MyRank.Run2TimeAdj = i.Run2TimeAdj;
                    MyRank.Run2NumCones = i.Run2NumOfCones;
                    MyRank.Run2Doc = i.Run2Doc;
                    MyRank.Run3Time = i.Run3Time;
                    MyRank.Run3TimeAdj = i.Run3TimeAdj;
                    MyRank.Run3NumCones = i.Run3NumOfCones;
                    MyRank.Run3Doc = i.Run3Doc;
                    MyRank.Run4Time = i.Run4Time;
                    MyRank.Run4TimeAdj = i.Run4TimeAdj;
                    MyRank.Run4NumCones = i.Run4NumOfCones;
                    MyRank.Run4Doc = i.Run4Doc;
                    ranks.Add(MyRank);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<DynamicRankingObjectAutoCross>();
            }
            return ranks.OrderByDescending(d => d.ScoreValue).ToList();
        }


        #endregion

        #region ScoreEndurance
        [WebMethod(Description = "Get All Scores Endurance")]
        public List<ScoreEndurance> GetScoresEndurance()
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            List<ScoreEndurance> scoresEndurance = context.ScoresEndurance.Include("Score").ToList();
            return scoresEndurance;
        }

        [WebMethod(Description = "Get Score Endurance by scoreid")]
        public ScoreEndurance GetScoreEndurance(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScoreEndurance scoreEndurance = context.ScoresEndurance.Include("Score").Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();
            return scoreEndurance;
        }
        [WebMethod(Description = "Get Score Details Endurance by scoreid")]
        public EnduranceDetailRankingObject GetScoreDetailsEndurance(int scoreid)
        {
            ATA_Context context = new ATA_Context();
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ProxyCreationEnabled = false;

            ScoreEndurance se = context.ScoresEndurance.Include("Score").Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
            EnduranceDetailRankingObject obj = new EnduranceDetailRankingObject();
            if (se != null)
            {

                obj.Id = se.Id;
                obj.Laps = se.Laps;
                obj.Cone = se.Cone;
                obj.Penalities = se.Penalities;
                obj.Time = Math.Round(se.Time, 3);
                obj.TminAvg = Math.Round(se.TminAvg, 3);
                obj.TotalScore = Math.Round(se.TotalScore, 3);
                obj.AdjTime = Math.Round(se.AdjTime, 3);
                obj.AdjTimeDNF = Math.Round(se.AdjTimeDNF, 3);
                obj.AvgLapTime = Math.Round(se.AvgLapTime, 3);
                obj.AvgLapTimeEfficiency = Math.Round(se.AvgLapTimeEfficiency, 3);
                obj.Co2Lap = Math.Round(se.Co2Lap, 3);
                obj.Co2Used = Math.Round(se.Co2Used, 3);
                obj.Doc = se.Doc;
                if (se.DriverChangeStart)
                    obj.DriverChangeStart = "Yes";
                else
                    obj.DriverChangeStart = "No";

                obj.EfficencyFactor = Math.Round(se.EfficencyFactor, 3);
                obj.EfficienctyScore = Math.Round(se.EfficienctyScore, 3);
                obj.EnduranceScore = Math.Round(se.EnduranceScore, 3);

                var fuel = context.Fuels.Where(d => d.Id.Equals(se.FuelType)).FirstOrDefault();
                if (fuel != null) { obj.FuelType = fuel.Name; }
                obj.FuelUsed = Math.Round(se.FuelUsed, 3);

            }
            return obj;
        }

        [WebMethod(Description = "Insert Score Endurance")]
        public bool InsertScoreEndurance(int eventid, int carid, int scoreid, double time, int laps, int penalities, int cones, int doc, double fuelUsed, int fuel_type)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                Event evt = context.Events.Where(e => e.Id.Equals(eventid)).FirstOrDefault();
                Car car = context.Cars.Where(c => c.Id.Equals(carid)).FirstOrDefault();

                Score score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();

                if ((score == null) && (evt != null) && (car != null))
                {
                    score = new Score();
                    score.Event = evt;
                    score.Car = car;

                    context.Scores.Add(score);

                    context.SaveChanges();

                    scoreid = context.Scores.Max(s => s.Id);
                    score = context.Scores.Where(s => s.Id.Equals(scoreid)).FirstOrDefault();
                }
                ScoreEndurance scoreE = new ScoreEndurance();

                scoreE.Score = score;

                scoreE.Time = time;
                scoreE.Laps = laps;
                scoreE.Penalities = penalities;
                scoreE.Cone = cones;
                scoreE.Doc = doc;
                scoreE.FuelUsed = fuelUsed;
                scoreE.FuelType = fuel_type;

                context.ScoresEndurance.Add(scoreE);

                //Event 2017 - Update Car Fuel Type if changed
                if (car != null)
                {
                    if (!(car.Fuel.Id.Equals(fuel_type)))
                    {
                        Fuel fuel = context.Fuels.Where(e => e.Id.Equals(fuel_type)).FirstOrDefault();
                        car.Fuel = fuel;
                    }
                }

                context.SaveChanges();

                CalculateScoreEndurance(scoreE.Score.Car.Class.Id);

                return true;

            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Update Score Endurance")]
        public bool UpdateScoreEndurance(int scoreid, double time, int laps, int penalities, int cones, int doc, double fuelUsed, int fuel_type)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreEndurance score = context.ScoresEndurance.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score != null)
                {
                    score.Time = time;
                    score.Laps = laps;
                    score.Penalities = penalities;
                    score.Cone = cones;
                    score.Doc = doc;
                    score.FuelUsed = fuelUsed;
                    score.FuelType = fuel_type;

                    //Event 2017 - Update Car Fuel Type if changed
                    Car car = context.Cars.Where(c => c.Carno.Equals(score.Score.Car.Carno)).FirstOrDefault();
                    if(car != null)
                    {
                        if (!(car.Fuel.Id.Equals(fuel_type)))
                        {
                            Fuel fuel = context.Fuels.Where(e => e.Id.Equals(fuel_type)).FirstOrDefault();
                            car.Fuel = fuel;
                        }
                    }

                    context.SaveChanges();

                    CalculateScoreEndurance(score.Score.Car.Class.Id);

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Delete Score Endurance")]
        public bool DeleteScoreEndurance(int scoreid)
        {
            try
            {
                ATA_Context context = new ATA_Context();

                ScoreEndurance score = context.ScoresEndurance.Where(s => s.Score.Id.Equals(scoreid)).FirstOrDefault();

                if (score != null)
                {
                    context.ScoresEndurance.Remove(score);
                    context.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return false;
            }

        }

        [WebMethod(Description = "Calculate Score Endurance")]
        public List<EnduranceRankingObject> CalculateScoreEndurance(int classId)
        {
            ATA_Context context = new ATA_Context();

            List<EnduranceRankingObject> ranks = new List<EnduranceRankingObject>();
            try
            {
                double maxTime, minTime, totalLap;
                List<ScoreEndurance> myScores = new List<ScoreEndurance>();
                myScores = context.ScoresEndurance.Where(d => d.Score.Car.Class.Id.Equals(classId)).ToList().OrderBy(d => d.Laps).ToList();

                double LapLenght = getLapLenghtEndurance();
                if (LapLenght == 0)
                    LapLenght = 0.79;

                double ConsumptionMax = getConsumptionMaxEndurance();
                if (ConsumptionMax == 0)
                    ConsumptionMax = 60.06;

                double minLapTotalCo2;
                double fuelEfficiencyFactorMin;
                double fuelEfficiencyFactorMax;

                totalLap = getTotalLapEndurance();
                //FDT - ATA 2023 - modifiche formula - INIZIO
                double TotalLenght = LapLenght * totalLap;
                double minTimeNonCorretto = myScores.Min(d => d.Time);
                //FDT - ATA 2023 - modifiche formula - FINE
                foreach (ScoreEndurance i in myScores)
                {

                    i.AdjTimeDNF = i.calculateAdjTimeDNF(i.Time, i.Penalities, i.Cone, i.Doc);
                    i.AdjTime = i.calculateAdjTime(i.Time, i.Laps, i.Penalities, i.Cone, i.Doc, totalLap);
                    i.AvgLapTime = i.calculateAvgLapTime(i.AdjTime, (double)i.Laps);
                    i.AvgLapTimeEfficiency = i.calcAvgLapTimeEfficiency(i.AdjTimeDNF, (double)i.Laps);

                    //SELECT * FROM Fuels
                    //Id  Name
                    //1   RON98
                    //2   E85
                    //3   Electric

                    //FDT - ATA 2023 - modifiche formula - INIZIO
                    switch (i.FuelType)
                    {
                        case 1:
                            i.Co2Used = i.FuelUsed * 2.31;
                            i.EnergyCorr = (i.FuelUsed * 100) / TotalLenght;
                            break;
                        case 2:
                            i.Co2Used = i.FuelUsed * 1.65;
                            i.EnergyCorr = ((i.FuelUsed * 100) / TotalLenght) / 1.45;
                            break;
                        case 3:
                            i.Co2Used = i.FuelUsed * 0.65;
                            i.EnergyCorr = (i.FuelUsed * 100) / TotalLenght;
                            break;
                    }
                    //FDT - ATA 2023 - modifiche formula - FINE
                }

                minTime = 0;
                //get min value
                var item = myScores.Where(d => d.AdjTime > 0).OrderBy(d => d.AdjTime).FirstOrDefault();
                if (item != null) { minTime = item.AdjTime; }

                //FDT - ATA 2023 - modifiche formula - INIZIO
                //maxTime = 1.45 * minTime;
                maxTime = 1.333 * minTime;
                //FDT - ATA 2023 - modifiche formula - FINE
                //int minimumLapNumber = (int)totalLap / 2; // check only integer part
                double maximumLapTime = maxTime / Convert.ToDouble(getTotalLapEndurance());
                
                double ConsumptionMaxCo2 = (ConsumptionMax / 100) * TotalLenght;

                foreach (ScoreEndurance i in myScores)
                {

                    i.Co2Lap = i.calcCo2Lap(i.Laps, i.FuelUsed, i.AvgLapTimeEfficiency, maximumLapTime, i.AvgLapTime, i.Co2Used);
                    //Event 2017 - Update formulas
                    //i.EnduranceScore = i.calcEnduranceScore(i.AdjTime, maxTime, minTime);
                    //if (i.EnduranceScore < i.Laps)
                    //    i.EnduranceScore = i.Laps;
                    i.EnduranceScore = i.calcEnduranceScore(i.AdjTime, maxTime, minTime, i.Laps);
                }

                minLapTotalCo2 = 0;
                item = myScores.Where(d => d.Co2Lap > 0).OrderBy(d => d.Co2Lap).FirstOrDefault();
                if (item != null) { minLapTotalCo2 = item.Co2Lap; }
                double Co2MaxLap = ConsumptionMaxCo2 / totalLap;


                foreach (ScoreEndurance i in myScores)
                {
                    if (i.Co2Lap < Co2MaxLap)
                        i.TminAvg = i.AvgLapTimeEfficiency;
                    else
                        i.TminAvg = 0;

                    //if (i.Laps > minimumLapNumber)
                    //    i.DriverChangeStart = true;
                    //else
                    //    i.DriverChangeStart = false;
                    i.DriverChangeStart = true;
                }

                double TminLapTotalmin = 0;
                // get TminAVG
                item = myScores.Where(d => d.TminAvg > 0).OrderBy(d => d.TminAvg).FirstOrDefault();
                if (item != null) { TminLapTotalmin = item.TminAvg; }

                foreach (ScoreEndurance i in myScores)
                {
                    //FDT - ATA 2023 - modifiche formula - INIZIO
                    if (i.Laps > 0 && i.FuelUsed > 0 && i.Time < 1.33 * minTimeNonCorretto)
                    {
                        switch (i.FuelType)
                        {
                            case 1:
                                if(i.EnergyCorr < 15)
                                {
                                    i.EfficencyFactor = (i.Time * i.Time * i.EnergyCorr) / 1000000;
                                }
                                else { i.EfficencyFactor = 0; }
                                break;
                            case 2:
                                if (i.EnergyCorr < 21.75)
                                {
                                    i.EfficencyFactor = (i.Time * i.Time * i.EnergyCorr) / 1000000;
                                }
                                else { i.EfficencyFactor = 0; }
                                break;
                            case 3:
                                i.EfficencyFactor = (i.Time * i.Time * i.EnergyCorr) / 1000000;
                                break;
                        }
                        //i.EfficencyFactor = 100 * TminLapTotalmin / (i.AdjTimeDNF / i.Laps) * (minLapTotalCo2 / (i.Co2Used / i.Laps));
                        //i.EfficencyFactor = (i.Time * i.Time * i.EnergyCorr)/1000000;
                    }
                    else { i.EfficencyFactor = 0; }
                    //FDT - ATA 2023 - modifiche formula - FINE
                }

                //FDT - ATA 2023 - modifiche formula - INIZIO
                fuelEfficiencyFactorMin = myScores.Min(d => d.EfficencyFactor); //100 * (TminLapTotalmin / maximumLapTime) * minLapTotalCo2 / Co2MaxLap;
                fuelEfficiencyFactorMax = 1.5 * fuelEfficiencyFactorMin; //myScores.Max(d => d.EfficencyFactor);
                //FDT - ATA 2023 - modifiche formula - FINE
                
                foreach (ScoreEndurance i in myScores)
                {
                    //FDT - ATA 2023 - modifiche formula - INIZIO
                    if (i.Laps > 0 && i.FuelUsed > 0 && i.EfficencyFactor > 0 )
                    {                        
                        i.EfficienctyScore = 100 * (fuelEfficiencyFactorMax - i.EfficencyFactor) / (fuelEfficiencyFactorMax - fuelEfficiencyFactorMin);
                        //i.EfficienctyScore = 100 * (fuelEfficiencyFactorMin / i.EfficencyFactor - 1) / (fuelEfficiencyFactorMin / fuelEfficiencyFactorMax - 1);
                        if (i.EfficienctyScore < 0)
                            i.EfficienctyScore = 0;
                    }
                    else { i.EfficienctyScore = 0; }
                    //FDT - ATA 2023 - modifiche formula - FINE

                    i.TotalScore = i.EfficienctyScore + i.EnduranceScore;
                    if (i.TotalScore < 0)
                        i.TotalScore = 0;
                    if (i.Score != null)
                        i.Score.GivenScore = i.TotalScore;

                }

                context.SaveChanges();

                //List<Car> AllCarsInClass = context.Cars.Where(c => c.Class.Id.Equals(classId)).ToList();

                //foreach (Car c in AllCarsInClass)
                //{
                //    if(myScores.Where(d=> d.Score.Event.Id)
                //}
              


                EnduranceRankingObject myRank;
                Score myScore = new Score();
                foreach (ScoreEndurance i in myScores)
                {
                    if (i.Score != null)
                    {

                        myScore = context.Scores.Where(d => d.Id == i.Score.Id).FirstOrDefault();
                        myRank = new EnduranceRankingObject();
                        myRank.Id = i.Id;
                        myRank.CarNum = myScore.Car.Carno;
                        myRank.RegNum = myScore.Car.Regno;
                        myRank.TeamId = myScore.Car.Team.Id;
                        myRank.TeamName = myScore.Car.Team.Name;
                        myRank.University = myScore.Car.Team.University;
                        myRank.AdjTime = Math.Round(i.AdjTime, 3);
                        myRank.Laps = i.Laps;
                        myRank.EnduranceScore = Math.Round(i.EnduranceScore, 3);
                        myRank.EfficiencyScore = Math.Round(i.EfficienctyScore, 3);
                        myRank.TotalScore = Math.Round(i.TotalScore, 3);

                        ranks.Add(myRank);
                    }
                    else
                    {
                        myRank = new EnduranceRankingObject();
                    }
                }


            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return ranks = new List<EnduranceRankingObject>();
            }
            return ranks.OrderByDescending(d => d.TotalScore).ToList();
        }

        #endregion

        #region SettingsEndurance


        [WebMethod(Description = "Set Total laps endurance")]
        public bool SetEnduranceSettings(int totalLaps, double lapLenght, double consumptionmax)
        {
            try
            {
                ATA_Context ctx = new ATA_Context();

                Settings mySettings = ctx.Settings.Where(d => d.KeyName == "TotalLapsEndurance").FirstOrDefault();
                if (mySettings != null)
                    mySettings.Value = totalLaps;
                else
                {
                    mySettings = new Settings();
                    mySettings.KeyName = "TotalLapsEndurance";
                    mySettings.Value = totalLaps;
                    ctx.Settings.Add(mySettings);
                }

                mySettings = ctx.Settings.Where(d => d.KeyName == "LapLenghtEndurance").FirstOrDefault();
                if (mySettings != null)
                    mySettings.Value = lapLenght;
                else
                {
                    mySettings = new Settings();
                    mySettings.KeyName = "LapLenghtEndurance";
                    mySettings.Value = lapLenght;
                    ctx.Settings.Add(mySettings);
                }

                mySettings = ctx.Settings.Where(d => d.KeyName == "ConsumptionMaxEndurance").FirstOrDefault();
                if (mySettings != null)
                    mySettings.Value = consumptionmax;
                else
                {
                    mySettings = new Settings();
                    mySettings.KeyName = "ConsumptionMaxEndurance";
                    mySettings.Value = consumptionmax;
                    ctx.Settings.Add(mySettings);
                }

                ctx.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
        [WebMethod(Description = "Get Total laps endurance")]
        public double getTotalLapEndurance()
        {
            ATA_Context ctx = new ATA_Context();

            Settings s = ctx.Settings.Where(d => d.KeyName == "TotalLapsEndurance").FirstOrDefault();
            if (s != null)
            {
                return s.Value;
            }
            else
            {
                s = new Settings() { KeyName = "TotalLapsEndurance", Value = Properties.Settings.Default.TotalLapsEndurance };
                ctx.Settings.Add(s);
                return s.Value;
            }

        }
        [WebMethod(Description = "Get Lap Length endurance")]
        public double getLapLenghtEndurance()
        {
            ATA_Context ctx = new ATA_Context();

            Settings s = ctx.Settings.Where(d => d.KeyName == "LapLenghtEndurance").FirstOrDefault();
            if (s != null)
            {
                return s.Value;
            }
            else
            {
                s = new Settings() { KeyName = "LapLenghtEndurance", Value = Properties.Settings.Default.LapLenghtEndurance };
                ctx.Settings.Add(s);
                return s.Value;
            }

        }
        [WebMethod(Description = "Get Consuption Max endurance")]
        public double getConsumptionMaxEndurance()
        {
            ATA_Context ctx = new ATA_Context();

            Settings s = ctx.Settings.Where(d => d.KeyName == "ConsumptionMaxEndurance").FirstOrDefault();
            if (s != null)
            {
                return s.Value;
            }
            else
            {
                s = new Settings() { KeyName = "ConsumptionMaxEndurance", Value = Properties.Settings.Default.ConsumptionMaxEndurance };
                ctx.Settings.Add(s);
                return s.Value;
            }
        }

        #endregion

        #region Penalties
        [WebMethod(Description = "Get Penalties")]
        public List<PenaltiesJsonObject> GetPenalties()
        {
            ATA_Context ctx = new ATA_Context();
            List<PenaltiesJsonObject> penalties = new List<PenaltiesJsonObject>();
            try
            {
                Penalties p;
                //  penalties = ctx.Penalties.LeftJoin(ctx.Cars, d => d.Id, f => f.Id, (d, f) => new PenaltiesObject { CarNo = f.Carno, TeamName = f.Team.Name, Documents = d.Documents, DriverMeetingAttendance = d.DriverMeetingAttendance, LackOfSEF = d.LackOfSEF }).ToList();
                foreach (Car c in ctx.Cars.ToList())
                {
                    p = new Penalties();
                    p = ctx.Penalties.Where(d => d.car.Id.Equals(c.Id)).FirstOrDefault();
                    if (p != null)
                        //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                        penalties.Add(new PenaltiesJsonObject() { PenalityID = p.Id, CarNo = c.Carno, TeamName = c.Team.Name, Documents = p.Documents, LackOfSEF = p.LackOfSEF, DriverMeetingAttendance = p.DriverMeetingAttendance, DriverPenalties = p.DriverPenalties, PostEnduranceScrutineering = p.PostEnduranceScrutineering, TotalPenalties = p.TotalPenalties, CarID = c.Id, IsAnElectricCar = c.IsAnElectricCar, PenaltiesNotes = p.PenaltiesNotes });
                    else
                        //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                        penalties.Add(new PenaltiesJsonObject() { PenalityID = 0, CarID = c.Id, CarNo = c.Carno, TeamName = c.Team.Name, Documents = 0, DriverMeetingAttendance = 0, LackOfSEF = 0, DriverPenalties = 0, TotalPenalties = 0, PostEnduranceScrutineering = 0, IsAnElectricCar = c.IsAnElectricCar, PenaltiesNotes = "" });
                }
            }
            catch (Exception ex)
            {
                ExceptionLogHelper.Error(ex);
                return penalties;
            }

            return penalties.OrderBy(d => d.CarNo).ToList();
        }

        [WebMethod(Description = "Insert / Update Penalties")]
        public bool SavePenalties(PenaltiesJsonObject[] penalities)
        {
            ATA_Context ctx = new ATA_Context();

            foreach (PenaltiesJsonObject po in penalities)
            {
                Penalties myPo = new Penalties();
                Car myCar = new Car();
                //if penality already exists

                if (ctx.Penalties.Where(d => d.Id.Equals(po.PenalityID)).ToList().Count > 0)
                {
                    myPo = ctx.Penalties.Where(d => d.Id.Equals(po.PenalityID)).FirstOrDefault();
                    myPo.LackOfSEF = po.LackOfSEF;
                    myPo.Documents = po.Documents;
                    myPo.DriverMeetingAttendance = po.DriverMeetingAttendance;
                    myPo.DriverPenalties = po.DriverPenalties;
                    myPo.PostEnduranceScrutineering = po.PostEnduranceScrutineering;
                    myPo.TotalPenalties = po.TotalPenalties;
                    myPo.PenaltiesNotes = po.PenaltiesNotes;

                }
                else
                {
                    myPo.LackOfSEF = po.LackOfSEF;
                    myPo.Documents = po.Documents;
                    myPo.DriverMeetingAttendance = po.DriverMeetingAttendance;
                    myPo.DriverPenalties = po.DriverPenalties;
                    myPo.PostEnduranceScrutineering = po.PostEnduranceScrutineering;
                    myPo.TotalPenalties = po.TotalPenalties;
                    myPo.car = ctx.Cars.Where(d => d.Id.Equals(po.CarID)).FirstOrDefault();
                    myPo.PenaltiesNotes = po.PenaltiesNotes;
                    ctx.Penalties.Add(myPo);
                }

                Score score = ctx.Scores.Where(d => d.Car.Id.Equals(myPo.car.Id)).FirstOrDefault();
                if (score != null)
                    score.PenalityScore = myPo.TotalPenalties;


                ctx.SaveChanges();
            }

            return true;
        }


        public bool UpdateCarPenalties(PenaltiesJsonObject po)
        {
            return true;
        }

        public bool AddCarPenalties(PenaltiesJsonObject po)
        {
            return true;
        }

        #endregion

        #region Overall Ranking
        [WebMethod(Description = "Get Overall Ranking")]
        public List<OverallRankingObject> GetOverallRanking(int classid)
        {
            List<Score> Scores = new List<Score>();
            ATA_Context ctx = new ATA_Context();
            OverallRankingObject myRank;
            List<OverallRankingObject> Ranks = new List<OverallRankingObject>();
            if (classid != 0)
            {
                Scores = ctx.Scores.Where(d => d.Car.Class.Id.Equals(classid)).ToList();
                List<Car> Cars = ctx.Cars.Where(c => c.Class.Id.Equals(classid)).ToList();

                if (Scores.Count == 0)
                    return Ranks;

                double MaxCostForClass = 0;
                double MaxDesignForClass = 0;
                double MaxPresentationForClass = 0;

                List<Score> ScoresMaxForCost = Scores.Where(d => d.Event.Id.Equals(2)).ToList();
                if (ScoresMaxForCost.Count > 0)
                    MaxCostForClass = ScoresMaxForCost.Max(d => d.GivenScore);

                List<Score> ScoresMaxForDesign = Scores.Where(d => d.Event.Id.Equals(5)).ToList();
                if (ScoresMaxForDesign.Count > 0)
                    MaxDesignForClass = ScoresMaxForDesign.Max(d => d.GivenScore);

                List<Score> ScoresMaxForPresentation = Scores.Where(d => d.Event.Id.Equals(6)).ToList();
                //fdt - prendo il max terzo se esiste
                if(ScoresMaxForPresentation.Count > 2)
                    MaxPresentationForClass = ScoresMaxForPresentation.OrderByDescending(d => d.GivenScore).Skip(2).Max(d => d.GivenScore);
                //fdt - get primi tre nel ranking
                List<int> listPrimiTre = ScoresMaxForPresentation.OrderByDescending(d => d.GivenScore).Take(3).Select(x => x.Car.Id).ToList();

                //if (ScoresMaxForPresentation.Count > 0)
                //    MaxPresentationForClass = ScoresMaxForPresentation.Max(d => d.GivenScore);

                if (Scores != null)
                {
                    if (Scores.Count > 0 && Cars.Count > 0)
                    {
                        foreach (Car c in Cars)
                        {
                            myRank = new OverallRankingObject();
                            //myRank.ScoreValue = Math.Round(Scores.Where(d => d.Car.Id.Equals(c.Id)).Sum(d => d.GivenScore), 3);

                            /*
                             * 1: Acceleration
                             * 2: Cost
                             * 3: SkidPad
                             * 4: AutoCross
                             * 5: Desig
                             * 6: Presentation
                             * 7: Endurance
                             */

                            double scoreAcceleration = 0;
                            Score AccScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(1)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (AccScore != null)
                                scoreAcceleration = AccScore.GivenScore;

                            double scoreSkidPad = 0;
                            Score SkidPadScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(3)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (SkidPadScore != null)
                                scoreSkidPad = SkidPadScore.GivenScore;

                            double scoreAutoCross = 0;
                            Score AutocrossScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(4)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (AutocrossScore != null)
                                scoreAutoCross = AutocrossScore.GivenScore;

                            double scoreEndurance = 0;
                            double scoreEnduranceEfficiency = 0;
                            Score EnduranceScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(7)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (EnduranceScore != null)
                            {
                                //AF - Giu 2016 - somma di Endurance score + Efficiency score (non è esatto)
                                scoreEndurance = EnduranceScore.GivenScore;

                                ScoreEndurance EnduranceScoreDetails = ctx.ScoresEndurance.Where(s => s.Score.Id.Equals(EnduranceScore.Id)).FirstOrDefault();
                                if (EnduranceScoreDetails != null)
                                {
                                    //AF - Giu 2016 - ora viene preso il valore giusto
                                    scoreEndurance = EnduranceScoreDetails.EnduranceScore;

                                    scoreEnduranceEfficiency = EnduranceScoreDetails.EfficienctyScore;
                                }
							}

							#region Carico i Maximun Score per Cost/Design/Presentation
							double maximumCost			= ctx.Events.Where(f => f.Id.Equals(2)).FirstOrDefault().MaximumScore;
                            double maximumPresentation	= ctx.Events.Where(f => f.Id.Equals(6)).FirstOrDefault().MaximumScore;
                            double maximumDesign		= ctx.Events.Where(f => f.Id.Equals(5)).FirstOrDefault().MaximumScore;
							#endregion

							double scoreCost = 0;
                            Score CostScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(2)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (CostScore != null)
                                scoreCost = CostScore.GivenScore;

                            double scoreDesign = 0;
                            Score DesignScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(5)).OrderByDescending(d => d.Id).FirstOrDefault();
                            if (DesignScore != null)
                                scoreDesign = DesignScore.GivenScore;

                            double scorePresentation = 0;
							//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
							double finalScore = 0;

                            Score PresentationScore = Scores.Where(d => d.Car.Id.Equals(c.Id) && d.Event.Id.Equals(6)).OrderByDescending(d => d.Id).FirstOrDefault();
							if (PresentationScore != null) { 
                                scorePresentation	= PresentationScore.GivenScore;
								//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
								finalScore			= PresentationScore.FinalsScore;
							}
                            double scoreCostNorm = 0;
                            double scoreDesignNorm = 0;
                            double scorePresentationNorm = 0;

                            if (MaxCostForClass != 0)
                                scoreCostNorm = scoreCost * maximumCost / MaxCostForClass;
                            if (MaxDesignForClass != 0)
                                scoreDesignNorm = scoreDesign * maximumDesign / MaxDesignForClass;


                            if (listPrimiTre.Contains(c.Id))
                                scorePresentationNorm = maximumPresentation;
                            else
                                scorePresentationNorm = scorePresentation * maximumPresentation / MaxPresentationForClass;
                            //if (MaxPresentationForClass != 0)
                            //    scorePresentationNorm = scorePresentation * maximumPresentation / MaxPresentationForClass;

                            myRank.CarNum		= c.Carno;
                            myRank.CarNum		= c.Carno;
                            myRank.RegNum		= c.Regno;
                            myRank.TeamId		= c.Team.Id;
                            myRank.TeamName		= c.Team.Name;
                            myRank.University	= c.Team.University;
                            myRank.CorrectedScoreAcceleration			= Math.Round(scoreAcceleration, 3);
                            myRank.CorrectedScoreAutocross				= Math.Round(scoreAutoCross, 3);
                            myRank.CorrectedScoreCost					= Math.Round(scoreCostNorm, 3);
                            myRank.CorrectedScoreDesign					= Math.Round(scoreDesignNorm, 3);
                            myRank.CorrectedScoreEndurance				= Math.Round(scoreEndurance, 3);
                            myRank.CorrectedScoreEnduranceEfficiency	= Math.Round(scoreEnduranceEfficiency, 3);

							//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                            //myRank.CorrectedScorePresentation = Math.Round(scorePresentationNorm, 3);
							myRank.CorrectedScorePresentation			= Math.Round(scorePresentationNorm + finalScore, 3);

                            myRank.CorrectedScoreSkidPad				= Math.Round(scoreSkidPad, 3);
                            //AF - Giu 2016 - somma di Endurance score + Efficiency score (non è esatto)
                            //myRank.ScoreValue = Math.Round(scoreAcceleration + scoreSkidPad + scoreAutoCross + scoreEndurance + scoreCostNorm + scoreDesignNorm + scorePresentationNorm, 3);
							
							//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                            //myRank.ScoreValue							= Math.Round(scoreAcceleration + scoreSkidPad + scoreAutoCross + scoreEndurance + scoreEnduranceEfficiency + scoreCostNorm + scoreDesignNorm + scorePresentationNorm, 3);
							myRank.ScoreValue							= Math.Round(scoreAcceleration + scoreSkidPad + scoreAutoCross + scoreEndurance + scoreEnduranceEfficiency + scoreCostNorm + scoreDesignNorm + scorePresentationNorm + finalScore, 3);
                            myRank.PenalityScore						= Math.Round(Scores.Where(d => d.Car.Id.Equals(c.Id)).Sum(d => d.PenalityScore), 3);
                            myRank.CorrectedScore						= Math.Round(myRank.ScoreValue - myRank.PenalityScore, 3);

                            Penalties penalty = ctx.Penalties.Where(d => d.car.Id.Equals(c.Id)).FirstOrDefault();
                            if (penalty != null)
                                myRank.PenalityNotes = penalty.PenaltiesNotes;

                            Ranks.Add(myRank);
                        }
                    }
                }

            }
            return Ranks.OrderByDescending(d => d.CorrectedScore).ToList();
        }

		#endregion

		#region PartialScores
		//Event 2018 - Show partials scores for Presentation and Design
		//Event 2019 - Presentation Event has been changed
		[WebMethod(Description = "Get Partial Scores for Presentation")]
        public List<CustomScoresPresentationPartial> GetScoresPresentationPartials(string scoresidlist)
        {
            ATA_Context context = new ATA_Context();

            List<CustomScoresPresentationPartial> partialScores = new List<CustomScoresPresentationPartial>();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
					//FD 2021.07.27 - ATA 2021  - Add Stage1
					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                    //string SQLCommandString = "SELECT ScoreId, Stage1, ExecutiveSummary, Novelty, Content, Finances, DeepDiveTopic, DemonstrationAndStructure, Delivery, Questions, GeneralImpression, Miscellaneous FROM VW_Scores_Partial_Presentation WHERE ScoreId IN (" + scoresidlist + ")";
					//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
					//string SQLCommandString = "SELECT ScoreId, Stage1, Novelty, Content, Finances, DeepDiveTopic, DemonstrationAndStructure, Delivery, Questions, GeneralImpression, Miscellaneous, DemonstrationAndDelivery FROM VW_Scores_Partial_Presentation WHERE ScoreId IN (" + scoresidlist + ")";
					//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
					//string SQLCommandString = "SELECT ScoreId, Stage1, Stage2, Novelty, Content, Finances, DeepDiveTopic, DemonstrationAndDelivery, Delivery, Questions, GeneralImpression, Miscellaneous FROM VW_Scores_Partial_Presentation WHERE ScoreId IN (" + scoresidlist + ")";
					string SQLCommandString = "SELECT ScoreId, Stage1, Stage2, Novelty, Content, Finances, DeepDiveTopic, DemonstrationAndDelivery, Delivery, Questions, GeneralImpression, Miscellaneous, Finals FROM VW_Scores_Partial_Presentation WHERE ScoreId IN (" + scoresidlist + ")";
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            CustomScoresPresentationPartial partialScore = new CustomScoresPresentationPartial();

                            partialScore.ScoreId                    = (int)dr["ScoreId"];

							//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
							//partialScore.ExecutiveSummary           = (double)dr["ExecutiveSummary"];
							partialScore.Novelty                    = (double)dr["Novelty"];
							partialScore.Content                    = (double)dr["Content"];
							partialScore.Finances                   = (double)dr["Finances"];
							partialScore.DeepDiveTopic              = (double)dr["DeepDiveTopic"];

							//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
							partialScore.DemonstrationAndDelivery	= (double)dr["DemonstrationAndDelivery"];

							//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
							//partialScore.DemonstrationAndStructure  = (double)dr["DemonstrationAndStructure"];

							partialScore.Delivery                   = (double)dr["Delivery"];
                            partialScore.Questions					= (double)dr["Questions"];
							partialScore.GeneralImpression			= (double)dr["GeneralImpression"];
							partialScore.Miscellaneous				= (double)dr["Miscellaneous"];

							//FD 2021.07.27 - ATA 2021  - Add Stage1
							partialScore.Stage1						= (double)dr["Stage1"];

							//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
							partialScore.Finals						= (double)dr["Finals"];

							//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
							partialScore.Stage2						= (double)dr["Stage2"];

							partialScores.Add(partialScore);
                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
            return partialScores;
        }

        //Event 2018 - Show partials scores for Presentation and Design
        [WebMethod(Description = "Get Partial Scores for Design1C3")]
        public List<CustomScoresDesign1C3Partial> GetScoresDesign1C3Partials(string scoresidlist)
        {
            ATA_Context context = new ATA_Context();

            List<CustomScoresDesign1C3Partial> partialScores = new List<CustomScoresDesign1C3Partial>();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "SELECT ScoreId, Powertrain, Suspension, FrameBodyAero, CockpitControlsBrakesSafety, SystemManagementIntegration, ManufacturabilityServiceability, AestheticsStyle, Creativity, Miscellaneous FROM VW_Scores_Partial_Design1C3 WHERE ScoreId IN (" + scoresidlist + ")";
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            CustomScoresDesign1C3Partial partialScore = new CustomScoresDesign1C3Partial();
                            partialScore.ScoreId = (int)dr["ScoreId"];
                            partialScore.Suspension = (double)dr["Suspension"];
                            partialScore.FrameBodyAero = (double)dr["FrameBodyAero"];
                            partialScore.CockpitControlsBrakesSafety = (double)dr["CockpitControlsBrakesSafety"];
                            partialScore.SystemManagementIntegration = (double)dr["SystemManagementIntegration"];
                            partialScore.ManufacturabilityServiceability = (double)dr["ManufacturabilityServiceability"];
                            partialScore.AestheticsStyle = (double)dr["AestheticsStyle"];
                            partialScore.Creativity = (double)dr["Creativity"];
                            partialScore.Miscellaneous = (double)dr["Miscellaneous"];
                            partialScore.Powertrain = (double)dr["Powertrain"];

                            partialScores.Add(partialScore);
                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
            return partialScores;
        }

        //Event 2018 - Show partials scores for Presentation and Design
        [WebMethod(Description = "Get Partial Scores for Design1E")]
        public List<CustomScoresDesign1EPartial> GetScoresDesign1EPartials(string scoresidlist)
        {
            ATA_Context context = new ATA_Context();

            List<CustomScoresDesign1EPartial> partialScores = new List<CustomScoresDesign1EPartial>();

            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "SELECT ScoreId, TractiveDriveRecoverySystem, Suspension, FrameBodyAero, CockpitControlsBrakesSafety, SystemManagementIntegration, ManufacturabilityServiceability, AestheticsStyle, Creativity, Miscellaneous FROM VW_Scores_Partial_Design1E WHERE ScoreId IN (" + scoresidlist + ")";
                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            CustomScoresDesign1EPartial partialScore = new CustomScoresDesign1EPartial();
                            partialScore.ScoreId = (int)dr["ScoreId"];
                            partialScore.Suspension = (double)dr["Suspension"];
                            partialScore.FrameBodyAero = (double)dr["FrameBodyAero"];
                            partialScore.CockpitControlsBrakesSafety = (double)dr["CockpitControlsBrakesSafety"];
                            partialScore.SystemManagementIntegration = (double)dr["SystemManagementIntegration"];
                            partialScore.ManufacturabilityServiceability = (double)dr["ManufacturabilityServiceability"];
                            partialScore.AestheticsStyle = (double)dr["AestheticsStyle"];
                            partialScore.Creativity = (double)dr["Creativity"];
                            partialScore.Miscellaneous = (double)dr["Miscellaneous"];
                            partialScore.TractiveDriveRecoverySystem = (double)dr["TractiveDriveRecoverySystem"];

                            partialScores.Add(partialScore);
                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
            return partialScores;
        }

        #endregion

    }

    public class RankingObject
    {
        public int CarNum { get; set; }
        public int RegNum { get; set; }
        public int TeamId { get; set; }
        public double ScoreValue { get; set; }
        public double NormalizedScore { get; set; }

		//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
		public double FinalsScore { get; set; }

        public string TeamName { get; set; }
        public double BestTime { get; set; }
        public string University { get; set; }
        public string CarColor { get; set; }
        public int CarColorMix { get; set; }

        //AF - Lug 2016 - Added Notes for Presentation
        public List<String> Notes { get; set; }

        public RankingObject()
        {
            this.CarNum = 0;
            this.RegNum = 0;
            this.TeamId = 0;
            this.ScoreValue = 0;
            this.TeamName = string.Empty;
            this.University = string.Empty;

            //AF - Lug 2016 - Added Notes for Presentation
            this.Notes = new List<String>();

            this.CarColor = string.Empty;
        }

        public void SetRankingColor(Car car)
        {
            //Display the car with the color of the committee, if valued and whether to use
            //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
            if (car.ExamBoards.Count == 1)
            {
                string color = car.ExamBoards.FirstOrDefault().Color;
                bool isColorUsed = car.ExamBoards.FirstOrDefault().IsColorUsed;
                if (isColorUsed) this.CarColor = color;
            }
            else
            {
                this.CarColor = "";
                this.CarColorMix = 1;
            }
        }

        public void SetRankingColor(Score s)
        {
            ATA_Context context = new ATA_Context();
            using (SqlConnection connection = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                try
                {
                    string SQLCommandString = "";

                    SQLCommandString += "SELECT Scores.Id AS ScoreId, Scores.Car_Id AS CarId, ";
                    SQLCommandString += "Events.EventName_Id AS EventNameId, EventNames.Name AS EventName, ";
                    SQLCommandString += "ExamBoards.Id AS BoardId, ExamBoards.Name AS BoardName, ExamBoards.Color, ExamBoards.IsColorUsed ";
                    SQLCommandString += "FROM Scores ";
                    SQLCommandString += "INNER JOIN Cars ON Scores.Car_Id = Cars.Id  ";
                    SQLCommandString += "INNER JOIN ExamBoardCars ON Cars.Id = ExamBoardCars.Car_Id  ";
                    SQLCommandString += "INNER JOIN ExamBoards ON ExamBoardCars.ExamBoard_Id = ExamBoards.Id  ";
                    SQLCommandString += "INNER JOIN Events ON Scores.Event_Id = Events.Id  ";
                    SQLCommandString += "INNER JOIN EventNames ON Events.EventName_Id = EventNames.Id ";
                    SQLCommandString += " WHERE Scores.Id = " + s.Id;
                    SQLCommandString += " AND Cars.Id = " + s.Car.Id;
                    SQLCommandString += " AND EventNames.Id = " + s.Event.EventName.Id; ;
                    SQLCommandString += " AND ExamBoards.Description LIKE '%DESIGN%'";

                    connection.Open();
                    SqlCommand command = new SqlCommand(SQLCommandString, connection);
                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            //Display the car with the color of the committee, if valued and whether to use
                            string color = (string)dr["Color"];
                            bool isColorUsed = (bool)dr["IsColorUsed"];
                            if (isColorUsed) this.CarColor = color;
                        }
                        dr.Close();
                    }
                }
                catch (Exception ex)
                {
                    ExceptionLogHelper.Error(ex);
                    throw ex;
                }
                finally
                {
                    connection.Close();

                }
            }
        }
    }

    public class DynamicRankingObject : RankingObject
    {
        public double Run1Time { get; set; }
        public double Run1TimeAdj { get; set; }
        public double Run1NumCones { get; set; }
        public double Run2Time { get; set; }
        public double Run2TimeAdj { get; set; }
        public double Run2NumCones { get; set; }
        public double Run3Time { get; set; }
        public double Run3TimeAdj { get; set; }
        public double Run3NumCones { get; set; }
        public double Run4Time { get; set; }
        public double Run4TimeAdj { get; set; }
        public double Run4NumCones { get; set; }
    }

    public class DynamicRankingObjectAutoCross : RankingObject
    {
        public double Run1Time { get; set; }
        public double Run1TimeAdj { get; set; }
        public double Run1NumCones { get; set; }
        public double Run1Doc { get; set; }
        public double Run2Time { get; set; }
        public double Run2TimeAdj { get; set; }
        public double Run2NumCones { get; set; }
        public double Run2Doc { get; set; }
        public double Run3Time { get; set; }
        public double Run3TimeAdj { get; set; }
        public double Run3NumCones { get; set; }
        public double Run3Doc { get; set; }
        public double Run4Time { get; set; }
        public double Run4TimeAdj { get; set; }
        public double Run4NumCones { get; set; }
        public double Run4Doc { get; set; }
    }

    public class DesignRankingObject : RankingObject
    {
        public double Suspension { get; set; }
        public double FrameBodyAero { get; set; }
        public double CockpitControlsBrakesSafety { get; set; }
        public double SystemManagementIntegration { get; set; }
        public double ManufacturabilityServiceability { get; set; }
        public double AestheticsStyle { get; set; }
        public double Creativity { get; set; }
        public double CarWeight { get; set; }
        public string SuspensionNotes { get; set; }
        public string FrameBodyAeroNotes { get; set; }
        public string CockpitControlsBrakesSafetyNotes { get; set; }
        public string SystemManagementIntegrationNotes { get; set; }
        public string ManufacturabilityServiceabilityNotes { get; set; }
        public string AestheticsStyleNotes { get; set; }
        public string CreativityNotes { get; set; }
        public double TractiveOrPowerTrain { get; set; }
        public string TractiveOrPowerTrainNotes { get; set; }

        public double Miscellaneous { get; set; }
        public string MiscellaneousNotes { get; set; }

        public string ExamBoardName { get; set; }

    }
    
    public class EnduranceRankingObject : RankingObject
    {
        public double Id { get; set; }
        public double EnduranceScore { get; set; }
        public double EfficiencyScore { get; set; }
        public double TotalScore { get; set; }
        public int Laps { get; set; }
        public double AdjTime { get; set; }

    }
    public class EnduranceDetailRankingObject
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

        public string FuelType { get; set; }

        public double Co2Used { get; set; }

        public double Co2Lap { get; set; }

        public double TminAvg { get; set; }

        public string DriverChangeStart { get; set; }

        public double EfficencyFactor { get; set; }

        public double EfficienctyScore { get; set; }

        public double TotalScore { get; set; }

    }
    public class OverallRankingObject : RankingObject
    {
        public double CorrectedScoreCost { get; set; }
        public double CorrectedScoreDesign { get; set; }
        public double CorrectedScorePresentation { get; set; }
        public double CorrectedScoreAcceleration { get; set; }
        public double CorrectedScoreSkidPad { get; set; }
        public double CorrectedScoreAutocross { get; set; }
        public double CorrectedScoreEndurance { get; set; }
        public double CorrectedScoreEnduranceEfficiency { get; set; }
        public double PenalityScore { get; set; }
        public string PenalityNotes { get; set; }
        public double CorrectedScore { get; set; }

		public OverallRankingObject() {
			this.PenalityNotes = string.Empty;
		}
	}

}
