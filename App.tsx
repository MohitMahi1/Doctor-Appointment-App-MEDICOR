import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Onboarding from './src/screens/OnBoardingScreensFlow/Onboarding'
import StackNavigation from './src/Navigations/StackNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const App = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <StackNavigation />
    </QueryClientProvider>

    </>


  )
}

export default App

const styles = StyleSheet.create({})