import { useNavigate } from "react-router-dom";
import "./onBoarding.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const Navigate = useNavigate();

  const coursesOptions = [
    "Frontend Development",
      "Backend Development",
      "Cyber Security",
      "Product Design",
      "Machine learning",
      "Data Analysis",
  ];

  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(inputValue);

    try {
        // const { data } = await axios.post("http://localhost:3300/api/v1/signup", {
        //     ...inputValue
        // },
        // { withCredentials: true }
        // );
        // const { success, message } = data;

        let { data } = axios
        .post("http://localhost:3300/api/v1/signup", {
          ...inputValue
        })

        console.log(data);


    }
    catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="on h-full py-5  w-full">
      <form
        onSubmit={handleSumbit}
        className="bg-white mx-auto w-[370px] md:w-[450px]"
      >
        <div className="flex flex-col p-5 mx-auto gap-5 justify-center items-center w-[340px] md:w-[400px]">
          <div className="w-full">
            <input
              name="firstName"
              value={inputValue.firstName}
              type="text"
              placeholder="Firstname"
              onChange={handleChange}
              className="border outline-none px-2 py-3 rounded-2xl w-full"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="lastName"
              value={inputValue.lastName}
              onChange={handleChange}
              placeholder="Lastname"
              className="border outline-none px-2 py-3 rounded-2xl w-full"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              placeholder="Email"
              className="border outline-none px-2 py-3 rounded-2xl w-full"
            />
          </div>

          <div className="p-1 border w-full">
            <label for="course">Choose a course:</label>

            <select
              name="course"
              value={inputValue.course}
              onChange={handleChange}
              className="outline-none mx-2 p-1 text-black"
              id="course"
            >
              {coursesOptions.map((courses, key) => (
                <option value={courses} key={key}>
                  {courses}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <textarea
              type="text"
              name="reason"
              value={inputValue.reason}
              onChange={handleChange}
              placeholder="Reasons why you shuld be chosen for this scholarship"
              className="border outline-none p-2 flex items-start w-full h-[150px]"
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="px-4 w-full py-2 rounded-xl text-bold text-white bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
