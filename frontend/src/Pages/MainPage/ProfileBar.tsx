const ProfileBar = () => {
  return (
    <div className="w-[246px] h-[871px] bg-color2 border border-none rounded-tl-xl flex flex-col rounded-tr-xl">
      <div className="flex items-center justify-center w-full bg-color1 rounded-tr-xl  border border-none rounded-tl-xl h-[75px]">
        <img className="mix-blend-darken" src="imgF.png" alt="" />
      </div>
      <span className="flex justify-center pt-2 text-xl font-medium text-white">
        Placeholder
      </span>
      <div className="w-[220px] h-[46px] flex flex-start mt-4 mx-auto items-center bg-white rounded-md shadow ">
        <div className="ml-9">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="3844470_home_house_icon 1">
              <path
                id="XMLID_1_"
                d="M23.6249 25.375H4.37494V14.875H2.83056C1.83481 14.875 1.37019 13.6334 2.12006 12.978L12.3646 3.27687C13.2816 2.40799 14.7174 2.40799 15.6344 3.27687L25.8781 12.978C26.6288 13.6325 26.1642 14.875 25.1676 14.875H23.6249V25.375Z"
                stroke="#00BD97"
                stroke-width="1.6"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="XMLID_2_"
                d="M17.5 25.375H10.5V20.125C10.5 18.1921 12.0671 16.625 14 16.625C15.9329 16.625 17.5 18.1921 17.5 20.125V25.375Z"
                stroke="#00BD97"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
        <span className="mx-4 text-lg font-normal text-teal-500 ">Home</span>
      </div>
      <ul className="flex flex-col mt-10 ml-12 space-y-10 ">
        <li className="flex gap-4 ">
          <div className="w-7 h-7 pl-[2.33px] pr-[2.34px] pt-[2.25px] pb-[2.36px] justify-center items-center flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M23.3132 17.2127C23.2899 17.194 20.8166 15.2993 20.8597 10.1777C20.8831 7.22366 19.9124 4.59866 18.1216 2.78683C16.5174 1.16166 14.3451 0.26333 12.0059 0.251663H11.9907C9.65275 0.26333 7.48042 1.16166 5.87508 2.788C4.08542 4.59983 3.11242 7.22366 3.13808 10.1777C3.18125 15.2293 0.781416 17.1392 0.685749 17.2127C0.382416 17.4378 0.258749 17.831 0.376582 18.1903C0.495582 18.5497 0.831583 18.7912 1.20725 18.7912H6.94725C7.06625 21.4862 9.27708 23.6445 11.9989 23.6445C14.7207 23.6445 16.9292 21.4862 17.0471 18.7912H22.7894C23.1651 18.7912 23.5011 18.5508 23.6177 18.1915C23.7379 17.8333 23.6142 17.439 23.3109 17.2138L23.3132 17.2127ZM12.0001 21.891C10.2442 21.891 8.81508 20.5178 8.70075 18.79H15.2994C15.1827 20.5167 13.7559 21.8933 12.0001 21.8933V21.891ZM3.11008 17.04C3.97342 15.7193 4.91608 13.5073 4.88808 10.1613C4.86708 7.64133 5.63942 5.51566 7.11992 4.0165C8.39508 2.725 10.1299 2.00983 12.0001 2.00166C13.8702 2.011 15.6016 2.725 16.8767 4.01766C18.3584 5.51683 19.1319 7.64133 19.1109 10.1625C19.0829 13.5085 20.0268 15.7217 20.8901 17.0412H3.11008V17.04Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="text-lg font-normal text-white">Notifications</div>
        </li>

        <li className="flex gap-4 ">
          <div className="w-7 h-7 pl-[2.33px] pr-[2.34px] pt-[2.25px] pb-[2.36px] justify-center items-center flex">
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M20.4583 0.520996H3.54159C1.77175 0.520996 0.333252 1.96066 0.333252 3.73166V18.3092C0.333252 20.0802 1.77175 21.521 3.54159 21.521H20.4583C22.2281 21.521 23.6666 20.0802 23.6666 18.3092V3.73166C23.6666 1.96066 22.2281 0.520996 20.4583 0.520996ZM3.54159 2.271H20.4583C21.2633 2.271 21.9166 2.92433 21.9166 3.72933V4.56233L12.5249 10.8238C12.2064 11.0338 11.7946 11.0362 11.4749 10.8215L2.08325 4.56233V3.72933C2.08325 2.92433 2.73659 2.271 3.54159 2.271ZM20.4583 19.7687H3.54159C2.73659 19.7687 2.08325 19.1153 2.08325 18.3103V6.61333L10.5299 12.2483C10.9768 12.547 11.4889 12.6963 11.9999 12.6963C12.5133 12.6963 13.0231 12.547 13.4699 12.2495L21.9166 6.6145V18.3068C21.9166 19.1118 21.2633 19.7652 20.4583 19.7652V19.7687Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="text-lg font-normal text-white">Messages</div>
        </li>

        <li className="flex gap-4 ">
          <div className="w-7 h-7 pl-[2.33px] pr-[2.34px] pt-[2.25px] pb-[2.36px] justify-center items-center flex">
            <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M20.2168 24.4167C20.0336 24.4167 19.8528 24.3583 19.7011 24.2487L11.0001 17.916L2.29911 24.251C2.03311 24.4423 1.68078 24.4727 1.38678 24.321C1.09511 24.1728 0.908447 23.8718 0.908447 23.5428V3.53333C0.908447 2.08667 2.08678 0.908333 3.53345 0.908333H18.4644C19.9111 0.908333 21.0894 2.08667 21.0894 3.53333V23.5417C21.0894 23.8707 20.9051 24.1717 20.6111 24.321C20.4874 24.3852 20.3509 24.4167 20.2144 24.4167H20.2168ZM11.0001 15.9583C11.1809 15.9583 11.3618 16.0143 11.5134 16.1263L19.3418 21.8232V3.53333C19.3418 3.05267 18.9486 2.65833 18.4668 2.65833H3.53345C3.05161 2.65833 2.65845 3.05267 2.65845 3.53333V21.8232L10.4868 16.1263C10.6384 16.0143 10.8193 15.9583 11.0001 15.9583Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="text-lg font-normal text-white">Collection</div>
        </li>

        <li className="flex gap-4 ">
          <div className="w-7 h-7 pl-[2.33px] pr-[2.34px] pt-[2.25px] pb-[2.36px] justify-center items-center flex">
            <svg
              width="20"
              height="25"
              viewBox="0 0 20 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M9.99989 12.7853C11.5807 12.7853 13.3506 12.6103 14.4799 11.32C15.4296 10.235 15.7376 8.55733 15.4202 6.196C14.9769 2.90017 12.9504 0.931999 9.99989 0.931999C7.04939 0.931999 5.02289 2.90017 4.57956 6.19833C4.26222 8.55733 4.57022 10.235 5.51989 11.32C6.64922 12.6115 8.41906 12.7853 9.99989 12.7853ZM6.31322 6.42933C6.50222 5.02933 7.23139 2.682 9.99989 2.682C12.7684 2.682 13.4976 5.0305 13.6866 6.42933C13.9281 8.23767 13.7531 9.49417 13.1616 10.1685C12.6307 10.7752 11.6846 11.0353 9.99989 11.0353C8.31522 11.0353 7.36906 10.7752 6.83822 10.1685C6.24672 9.49417 6.07172 8.2365 6.31322 6.42933ZM19.6599 21.442C18.6367 17.3283 14.6642 14.4537 9.99989 14.4537C5.33556 14.4537 1.36306 17.3283 0.339889 21.442C0.139223 22.2493 0.307222 23.0753 0.800722 23.7053C1.27672 24.312 2.01406 24.662 2.82256 24.662H17.1772C17.9857 24.662 18.7231 24.312 19.1991 23.7053C19.6937 23.0753 19.8606 22.2505 19.6587 21.442H19.6599ZM17.8212 22.6273C17.6742 22.814 17.4526 22.9143 17.1772 22.9143H2.82256C2.54839 22.9143 2.32556 22.8152 2.17856 22.6273C2.01872 22.4243 1.96856 22.1467 2.03856 21.8643C2.86689 18.5335 6.14172 16.206 9.99989 16.206C13.8581 16.206 17.1329 18.5323 17.9612 21.8643C18.0312 22.1467 17.9811 22.4243 17.8212 22.6273Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="text-lg font-normal text-white">Profile</div>
        </li>

        <li className="flex gap-4 ">
          <div className="w-7 h-7 pl-[2.33px] pr-[2.34px] pt-[2.25px] pb-[2.36px] justify-center items-center flex">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M18.2499 10.9583C17.1241 10.9583 16.2083 11.8765 16.2083 13C16.2083 14.1235 17.1229 15.0417 18.2499 15.0417C19.3746 15.0417 20.2916 14.1247 20.2916 13C20.2916 11.8753 19.3746 10.9583 18.2499 10.9583ZM18.2499 13.875C17.7669 13.875 17.3749 13.483 17.3749 13C17.3749 12.5182 17.7681 12.125 18.2499 12.125C18.7318 12.125 19.1249 12.517 19.1249 13C19.1249 13.4818 18.7329 13.875 18.2499 13.875ZM12.9999 10.9583C11.8729 10.9583 10.9583 11.8765 10.9583 13C10.9583 14.1235 11.8741 15.0417 12.9999 15.0417C14.1258 15.0417 15.0416 14.1247 15.0416 13C15.0416 11.8753 14.1269 10.9583 12.9999 10.9583ZM12.9999 13.875C12.5169 13.875 12.1249 13.483 12.1249 13C12.1249 12.5182 12.5181 12.125 12.9999 12.125C13.4818 12.125 13.8749 12.517 13.8749 13C13.8749 13.4818 13.4829 13.875 12.9999 13.875ZM7.74992 10.9583C6.62409 10.9583 5.70825 11.8765 5.70825 13C5.70825 14.1235 6.62409 15.0417 7.74992 15.0417C8.87458 15.0417 9.79158 14.1247 9.79158 13C9.79158 11.8753 8.87342 10.9583 7.74992 10.9583ZM7.74992 13.875C7.26692 13.875 6.87492 13.483 6.87492 13C6.87492 12.5182 7.26809 12.125 7.74992 12.125C8.23175 12.125 8.62492 12.517 8.62492 13C8.62492 13.4818 8.23292 13.875 7.74992 13.875Z"
                  fill="white"
                />
                <path
                  id="Vector_2"
                  d="M12.9999 25.5417C6.08392 25.5417 0.458252 19.916 0.458252 13C0.458252 6.084 6.08392 0.458336 12.9999 0.458336C19.9159 0.458336 25.5416 6.084 25.5416 13C25.5416 19.916 19.9159 25.5417 12.9999 25.5417ZM12.9999 2.20834C7.04992 2.20834 2.20825 7.05 2.20825 13C2.20825 18.95 7.04992 23.7917 12.9999 23.7917C18.9499 23.7917 23.7916 18.95 23.7916 13C23.7916 7.05 18.9499 2.20834 12.9999 2.20834Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>
          <div className="text-lg font-normal text-white">More</div>
        </li>
      </ul>
      <div className="w-[246px] h-[53px] bg-color1 flex justify-center items-center mt-auto">
        <span className="text-lg font-semibold text-white">LOGOUT</span>
      </div>
    </div>
  );
};

export default ProfileBar;
