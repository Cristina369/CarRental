using Azure.Core;
using CarRental.API.Models.DTO;
using CarRental.API.Models.ViewModels;
using CarRental.API.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    public class AccountController : Controller
    {
		private readonly UserManager<IdentityUser> userManager;
		private readonly SignInManager<IdentityUser> signInManager;
        private readonly ITokenRepository tokenRepository;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ITokenRepository tokenRepository)
        {
			this.userManager = userManager;
			this.signInManager = signInManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
		public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
		{
            var user = new IdentityUser
            {
                UserName = registerViewModel.FirstName?.Trim() + registerViewModel.LastName?.Trim(),
                PhoneNumber = registerViewModel.PhoneNumber?.Trim(),
                Email = registerViewModel.Email?.Trim()
            };

           
            var identityResult = await userManager.CreateAsync(user, registerViewModel.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(user, "User");

                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);
		}


        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var identityUser = await userManager.FindByEmailAsync(loginViewModel.Email);

            if (identityUser is not null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, loginViewModel.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

                    var response = new LoginResponseRequest()
                    {
                        Email = loginViewModel.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");


            return ValidationProblem(ModelState);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
