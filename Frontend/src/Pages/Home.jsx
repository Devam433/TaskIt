import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import { useSelector } from 'react-redux';

function Home() {
  // const [userData,setUserData] = useState();
  const currentUser = useSelector(state=>state.auth.userData);
  console.log(currentUser);
  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    if(currentUser) {
    axios.get('/api/users/me',
      {
        headers:{
          token:localStorage.getItem('token')
        }
      }
    )
    .then(response=>{
      console.log(response);
      // setUserData(response.data)
    })
  }
  },[currentUser])

  return (
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-7 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Todo App {currentUser?.name}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Organize your tasks, boost your productivity, and achieve your goals with TaskIt.
                </p>
              </div>
              <div className="space-x-4">
                <Button href="/features">
                  <Button>Learn More</Button>
                </Button>
                <Button href="/signup">
                  <Button variant="outline">Get Started</Button>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Home