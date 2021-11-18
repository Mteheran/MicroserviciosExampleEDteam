using Microsoft.AspNetCore.Mvc;

namespace service2.Controllers;

[ApiController]
[Route("[controller]")]
public class RevertTextController : ControllerBase
{
    [HttpPost]
    public string Revert(TextModel text)
    {
        return string.Join("", text.Text.Reverse());
    }
}

public class TextModel
{
    public string Text {get;set;} 
}
