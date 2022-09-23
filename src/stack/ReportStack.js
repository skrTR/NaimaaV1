import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyBackButton from "../components/MyBackButton";
import ProductDetailScreen from "../screens/List/ProductDetailScreen";
import AllReportChooseModal from "../screens/Report/AllReportModal/AllReportChooseModal";
import AllReportScreen from "../screens/Report/AllReportScreen";
import AllStaticScreen from "../screens/Report/AllStaticScreen";
import BillDetailScreen from "../screens/Report/BillDetailScreen";
import BoughtRemainderScreen from "../screens/Report/BoughtRemainderScreen";
import IncomeStaticScreen from "../screens/Report/IncomeStaticScreen";
import LoanInfoModal from "../screens/Report/LoanInfoModal";
import LoanStaticScreen from "../screens/Report/LoanStaticScreen";
import OutcomeStaticScreen from "../screens/Report/OutcomeStaticScreen";
import ProfitScreen from "../screens/Report/ProfitScreen";
import ReceivableStaticScreen from "../screens/Report/ReceivableStaticScreen";
import ReportScreen from "../screens/Report/ReportScreen";

const ReportStack = () => {
  const ReportStack = createNativeStackNavigator();
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ headerShown: false }}
      />
      <ReportStack.Screen
        name="BillDetailScreen"
        component={BillDetailScreen}
        options={{
          presentation: "formSheet",
          title: "Билл дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="AllStaticScreen"
        component={AllStaticScreen}
        options={{
          presentation: "formSheet",
          title: "Бүх тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="IncomeStaticScreen"
        component={IncomeStaticScreen}
        options={{
          presentation: "formSheet",
          title: "Орлогын тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="OutcomeStaticScreen"
        component={OutcomeStaticScreen}
        options={{
          presentation: "formSheet",
          title: "Зарлагын тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          presentation: "formSheet",
          title: "Барааны дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="AllReportScreen"
        component={AllReportScreen}
        options={{
          presentation: "formSheet",
          title: "Нэгдсэн тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ProfitScreen"
        component={ProfitScreen}
        options={{
          presentation: "formSheet",
          title: "Ашиг орлогын тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="BoughtRemainderScreen"
        component={BoughtRemainderScreen}
        options={{
          presentation: "formSheet",
          title: "Эхний үлдэгдэл болон дундаж үнэ",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ReceivableStaticScreen"
        component={ReceivableStaticScreen}
        options={{
          presentation: "formSheet",
          title: "Авлагын тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="LoanStaticScreen"
        component={LoanStaticScreen}
        options={{
          presentation: "formSheet",
          title: "Зээлийн тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="LoanInfoModal"
        component={LoanInfoModal}
        options={{
          presentation: "formSheet",
          title: "Зээлийн Дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="AllReportChooseModal"
        component={AllReportChooseModal}
        options={{
          presentation: "formSheet",
          title: "Сонгох",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </ReportStack.Navigator>
  );
};

export default ReportStack;
