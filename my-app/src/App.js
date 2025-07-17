import "./styles.css";
import Calendar from "./Calender/Calendar";
import Connect4 from "./Connect4/Connect4";
import DynamicForm from "./DynamicForm/DynamicForm";//Calculator
import Calculator from "./Calculator/Calculator";//Calculator

import formSchema from './DynamicForm/FormSchema';

export default function App() {

  const handleSubmit = (formValues) => {
    console.log('Form values:', formValues);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Event Calendar</h1>
      {/* <Calendar /> */}
      {/* <Connect4 /> */}
         <DynamicForm schema={formSchema} onSubmit={handleSubmit}/>
         {/* <Calculator /> */}
    </div>
  );
}