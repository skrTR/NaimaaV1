import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyBackButton from "../components/MyBackButton";
import ProductDetailScreen from "../screens/List/ProductDetailScreen";
import DateExtendScreen from "../screens/Payment/DateExtendScreen";
import QpayModal from "../screens/Payment/QpayModal";
import AllReportScreen from "../screens/Report/AllReportScreen";
import BillDetailScreen from "../screens/Report/BillDetailScreen";
import BoughtRemainderScreen from "../screens/Report/BoughtRemainderScreen";
import IncomeStaticScreen from "../screens/Report/IncomeStaticScreen";
import LoanInfoModal from "../screens/Report/LoanInfoModal";
import LoanStaticScreen from "../screens/Report/LoanStaticScreen";
import ChooseCategoryModal from "../screens/Report/Modal/ChooseCategoryModal";
import ChooseModal from "../screens/Report/Modal/ChooseModal";
import ReportCategoryModal from "../screens/Report/Modal/ReportCategoryModal";
import ReportDateModal from "../screens/Report/Modal/ReportDateModal";
import OutcomeStaticScreen from "../screens/Report/OutcomeStaticScreen";
import ProfitScreen from "../screens/Report/ProfitScreen";
import ReceivableStaticScreen from "../screens/Report/ReceivableStaticScreen";
import ReportScreen from "../screens/Report/ReportScreen";
import SalesForecastReport from "../screens/Report/SalesForecastReport";
import TransactionReport from "../screens/Report/TransactionReport";

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
        name="ChooseModal"
        component={ChooseModal}
        options={{
          presentation: "formSheet",
          title: "Сонгох",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ReportDateModal"
        component={ReportDateModal}
        options={{
          presentation: "formSheet",
          title: "Сонгох",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ReportCategoryModal"
        component={ReportCategoryModal}
        options={{
          presentation: "formSheet",
          title: "Сонгох",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="ChooseCategoryModal"
        component={ChooseCategoryModal}
        options={{
          presentation: "formSheet",
          title: "Сонгох",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="QpayModal"
        component={QpayModal}
        options={{
          presentation: "formSheet",
          title: "Qpay",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="DateExtendScreen"
        component={DateExtendScreen}
        options={{
          presentation: "formSheet",
          title: "Хугацаа сунгах",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="TransactionReport"
        component={TransactionReport}
        options={{
          presentation: "formSheet",
          title: "Гүйлгээний тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ReportStack.Screen
        name="SalesForecastReport"
        component={SalesForecastReport}
        options={{
          presentation: "formSheet",
          title: "Борлуулалт төсөөллийн нэгдсэн тайлан",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </ReportStack.Navigator>
  );
};

export default ReportStack;
