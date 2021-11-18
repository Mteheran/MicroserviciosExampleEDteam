using Microsoft.AspNetCore.Mvc;
using Humanizer;
namespace service1.Controllers;

[Route("[controller]")]
[ApiController]
public class NumberToLetterController : ControllerBase
{

        [HttpGet("{number}")]
        public async Task<ActionResult<string>> ConvertToLetter(int number)
        {
            string result = number.ToWords(false, new System.Globalization.CultureInfo("ES-es"));
            return Ok(result);
        }
   
}
