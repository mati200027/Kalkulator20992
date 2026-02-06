using Microsoft.AspNetCore.Mvc;

namespace Kalkulator.Controllers
{
    public class CalculatorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
