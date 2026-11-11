import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { ThemeToggle } from '@/components/theme-toggle';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  })

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    <div className='sticky top-0 z-50 shadow-sm flex justify-between items-center px-4 sm:px-6 py-2 bg-background border-b border-border'>
      <a href="/">
        <img src="/logo.svg" alt="Intelligent Travel Guide" className='h-10' />
      </a>
      <div className='flex items-center gap-1 sm:gap-2'>
        <ThemeToggle />
        <a href="/destinations">
          <Button variant="ghost" className="rounded-full text-xs sm:text-sm hidden sm:inline-flex">Destinations</Button>
        </a>
        <a href="/recommendations">
          <Button variant="ghost" className="rounded-full text-xs sm:text-sm hidden md:inline-flex">Recommendations</Button>
        </a>
        <a href="/assistant">
          <Button variant="ghost" className="rounded-full text-xs sm:text-sm hidden lg:inline-flex">AI Assistant</Button>
        </a>
        {user ? (
          <div className='flex items-center gap-1 sm:gap-2'>
            <a href="/dashboard">
              <Button variant="ghost" className="rounded-full text-xs sm:text-sm hidden md:inline-flex">Dashboard</Button>
            </a>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-xs sm:text-sm">+ Guide</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-xs sm:text-sm hidden sm:inline-flex">My Plans</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent className='w-48'>
                <a href="/profile" className='block py-2 text-sm hover:font-medium'>Profile</a>
                <a href="/manage/destinations" className='block py-2 text-sm hover:font-medium'>Manage Destinations</a>
                <a href="/manage/attractions" className='block py-2 text-sm hover:font-medium'>Manage Attractions</a>
                <hr className='my-2' />
                <button
                  type='button'
                  className='text-sm text-left w-full py-2'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className='text-xs sm:text-sm'>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
              <h2 className='font-bold text-lg'>Sign in to access your travel guide</h2>
              <p>Sign in securely with Google to save and view your travel plans</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header
