import React from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/admin/Dashboard'
import ManageTasks from './pages/admin/ManageTasks'
import ManageUsers from './pages/admin/ManageUsers'
import CreateTask from './pages/admin/CreateTask'
import PrivateRoute from './routes/PrivateRoute'
import UserDashboard from './pages/user/UserDashboard'
import MyTask from './pages/user/MyTask'
import TaskDetails from './pages/user/TaskDetails'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
                {/* auth routes  */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>


                {/* adming routes  */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/tasks' element={<ManageTasks/>}/>
          <Route path='/admin/users' element={<ManageUsers/>}/>
          <Route path='/admin/create-task' element={<CreateTask/>}/>
          </Route>


          {/* Users Routes  */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path='/user/dashboard' element={<UserDashboard/>}/>
          <Route path='/user/tasks' element={<MyTask/>}/>
          <Route path='/user/task-details/:id' element={<TaskDetails/>}/>
            </Route>




        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
