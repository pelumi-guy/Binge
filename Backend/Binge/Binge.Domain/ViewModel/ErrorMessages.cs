using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Binge.Domain.ViewModel
{
    public class ErrorMessages
    {
        public const string DataNotExist = $"cannot be found";
        public const string UserFaveMovieNotExist = "Movie not found in the Favorite list for user";
        public const string DatabaseErrorOccured = "An error occured while updating database";
        public const string RemovedSuccessfully = "removed successfully";
    }
}
