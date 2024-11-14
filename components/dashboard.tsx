'use client'

import * as React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Bell, Home, PieChartIcon, Settings, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the charts
const taskStatusData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Pending', value: 200 },
]

const taskTypeData = [
  { name: 'Commits', completed: 120, inProgress: 80, pending: 40 },
  { name: 'Pull Requests', completed: 80, inProgress: 60, pending: 30 },
  { name: 'Issues', completed: 200, inProgress: 160, pending: 130 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-6 py-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PieChartIcon className="mr-2 h-4 w-4" />
                  Analytics
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <p className="px-6 py-4 text-sm text-gray-500">© 2024 Git Task Manager</p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <header className="mb-6">
              <h1 className="text-3xl font-bold">Git Task Dashboard</h1>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Status Overview</CardTitle>
                  <CardDescription>Distribution of tasks by their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {taskStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Task Types Breakdown</CardTitle>
                  <CardDescription>Comparison of different task types and their statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-1))",
                      },
                      inProgress: {
                        label: "In Progress",
                        color: "hsl(var(--chart-2))",
                      },
                      pending: {
                        label: "Pending",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskTypeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                        <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" />
                        <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}