﻿using Microsoft.AspNetCore.Identity;

namespace CarRental.API.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
