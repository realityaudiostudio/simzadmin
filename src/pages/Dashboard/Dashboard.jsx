import React from 'react';
import "./Dashboard.css";
import NavButton from "../../assets/NavButton.svg"
import SearchButton from "../../assets/SearchButton.svg"
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import Sections from '../../components/Sections/Sections';


function Dashboard() {

    const links=[
      {
        icon:<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M31.1667 11.0642V22.9358C31.1667 27.4833 27.4833 31.1667 22.9358 31.1667H11.0642C6.51666 31.1667 2.83333 27.4833 2.83333 22.9358V11.0642C2.83333 7.53667 4.27833 4.9725 6.84249 3.72584C7.77749 3.2725 8.85416 3.98084 8.85416 5.015V17.595C8.85416 19.2808 9.50583 20.6267 10.6817 21.3067C11.8717 21.9725 13.3733 21.8308 14.9033 20.91L16.745 19.805C16.8583 19.7483 17.1417 19.7483 17.2267 19.7908L19.0967 20.91C20.1167 21.5192 20.995 21.7175 21.7033 21.7175C22.44 21.7175 23.0067 21.4908 23.3467 21.2925C24.4942 20.6267 25.1458 19.2808 25.1458 17.595V5.015C25.1458 3.98084 26.2367 3.2725 27.1575 3.72584C29.7217 4.9725 31.1667 7.53667 31.1667 11.0642Z" fill="#5B2867"/>
        <path d="M21.6042 2.83334C22.3833 2.83334 23.0208 3.47084 23.0208 4.25001V17.595C23.0208 18.5017 22.7517 19.1817 22.2842 19.4508C21.8025 19.7342 21.0375 19.5925 20.1875 19.0825L18.3175 17.9633C17.595 17.5242 16.405 17.5242 15.6825 17.9633L13.8125 19.0825C12.9625 19.5925 12.1975 19.72 11.7158 19.4508C11.2483 19.1817 10.9792 18.5017 10.9792 17.595V4.25001C10.9792 3.47084 11.6167 2.83334 12.3958 2.83334H21.6042Z" fill="#5B2867"/>
      </svg>,
        linkName:"Syllabus",
        color:"#ECD7F7",
        link:"/syllabus"
      },
      {
        icon:<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M20.3292 2.83334H13.6708C12.1975 2.83334 10.9933 4.02334 10.9933 5.49668V6.82834C10.9933 8.30168 12.1833 9.49168 13.6567 9.49168H20.3292C21.8025 9.49168 22.9925 8.30168 22.9925 6.82834V5.49668C23.0067 4.02334 21.8025 2.83334 20.3292 2.83334Z" fill="#7E1E25"/>
        <path d="M24.4233 6.82834C24.4233 9.08084 22.5817 10.9225 20.3292 10.9225H13.6708C11.4183 10.9225 9.57666 9.08084 9.57666 6.82834C9.57666 6.035 8.72666 5.53917 8.01833 5.9075C6.02083 6.97 4.66083 9.08083 4.66083 11.5033V24.8342C4.66083 28.3192 7.50833 31.1667 10.9933 31.1667H23.0067C26.4917 31.1667 29.3392 28.3192 29.3392 24.8342V11.5033C29.3392 9.08083 27.9792 6.97 25.9817 5.9075C25.2733 5.53917 24.4233 6.035 24.4233 6.82834ZM17.5383 24.0125H11.3333C10.7525 24.0125 10.2708 23.5308 10.2708 22.95C10.2708 22.3692 10.7525 21.8875 11.3333 21.8875H17.5383C18.1192 21.8875 18.6008 22.3692 18.6008 22.95C18.6008 23.5308 18.1192 24.0125 17.5383 24.0125ZM21.25 18.3458H11.3333C10.7525 18.3458 10.2708 17.8642 10.2708 17.2833C10.2708 16.7025 10.7525 16.2208 11.3333 16.2208H21.25C21.8308 16.2208 22.3125 16.7025 22.3125 17.2833C22.3125 17.8642 21.8308 18.3458 21.25 18.3458Z" fill="#7E1E25"/>
      </svg>,
        linkName:"Quiz",
        color:"#FECACE",
        link:"/quiz"
      },
      {
        icon:<svg xmlns="http://www.w3.org/2000/svg" width="34" height="35" viewBox="0 0 34 35" fill="none">
        <path d="M20.5983 19.6158C20.0883 19.6158 19.6775 20.0267 19.6775 20.5367C19.6775 21.0467 20.0883 21.4575 20.5983 21.4575C21.1083 21.4575 21.5192 21.0467 21.5192 20.5367C21.505 20.0267 21.0942 19.6158 20.5983 19.6158Z" fill="#1B3C5F"/>
        <path d="M12.835 21.0183C12.325 21.0183 11.9142 21.4292 11.9142 21.9392C11.9142 22.4492 12.325 22.86 12.835 22.86C13.345 22.86 13.7558 22.4492 13.7558 21.9392C13.7558 21.4292 13.345 21.0183 12.835 21.0183Z" fill="#1B3C5F"/>
        <path d="M22.9358 3.08334H11.0642C5.9075 3.08334 2.83333 6.15751 2.83333 11.3142V23.1717C2.83333 28.3425 5.9075 31.4167 11.0642 31.4167H22.9217C28.0783 31.4167 31.1525 28.3425 31.1525 23.1858V11.3142C31.1667 6.15751 28.0925 3.08334 22.9358 3.08334ZM23.9133 13.7792V20.5225C23.9133 22.35 22.4258 23.8375 20.5983 23.8375C18.7708 23.8375 17.2833 22.35 17.2833 20.5225C17.2833 18.695 18.7708 17.2075 20.5983 17.2075C20.9242 17.2075 21.2217 17.2642 21.5192 17.3492V15.3375L16.1642 16.7967V21.925C16.1642 21.9392 16.15 21.9533 16.15 21.9675C16.1358 23.7808 14.6483 25.24 12.835 25.24C11.0075 25.24 9.52 23.7525 9.52 21.925C9.52 20.0975 11.0075 18.61 12.835 18.61C13.1608 18.61 13.4583 18.6667 13.7558 18.7517V15.8758V13.4108C13.7558 12.0367 14.6058 10.9175 15.9375 10.5633L20.1733 9.40168C21.5333 9.03334 22.3833 9.38751 22.865 9.75584C23.3325 10.1242 23.9133 10.8467 23.9133 12.2633V13.7792Z" fill="#1B3C5F"/>
      </svg>,
        linkName:"Sheets",
        color:"#C4DCF3",
        link:"/sheets"
      },
      {
        icon:<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M27.0867 12.92C26.5342 12.92 26.095 13.3592 26.095 13.9117V16.15C26.095 21.165 22.015 25.245 17 25.245C11.985 25.245 7.905 21.165 7.905 16.15V13.8975C7.905 13.345 7.46583 12.9058 6.91333 12.9058C6.36083 12.9058 5.92167 13.345 5.92167 13.8975V16.1358C5.92167 21.9017 10.3558 26.6475 16.0083 27.1575V30.175C16.0083 30.7275 16.4475 31.1667 17 31.1667C17.5525 31.1667 17.9917 30.7275 17.9917 30.175V27.1575C23.63 26.6617 28.0783 21.9017 28.0783 16.1358V13.8975C28.0642 13.3592 27.625 12.92 27.0867 12.92Z" fill="#5B2867"/>
        <path d="M17 2.83334C13.5433 2.83334 10.7383 5.63834 10.7383 9.09501V16.3483C10.7383 19.805 13.5433 22.61 17 22.61C20.4567 22.61 23.2617 19.805 23.2617 16.3483V9.09501C23.2617 5.63834 20.4567 2.83334 17 2.83334ZM18.8558 12.6792C18.7567 13.0475 18.4308 13.2883 18.0625 13.2883C17.9917 13.2883 17.9208 13.2742 17.85 13.26C17.2975 13.1042 16.7167 13.1042 16.1642 13.26C15.7108 13.3875 15.2717 13.1183 15.1583 12.6792C15.0308 12.24 15.3 11.7867 15.7392 11.6733C16.575 11.4467 17.4533 11.4467 18.2892 11.6733C18.7142 11.7867 18.9692 12.24 18.8558 12.6792ZM19.6067 9.93084C19.4792 10.2708 19.1675 10.4692 18.8275 10.4692C18.7283 10.4692 18.6433 10.455 18.5442 10.4267C17.5525 10.0583 16.4475 10.0583 15.4558 10.4267C15.0308 10.5825 14.5492 10.3558 14.3933 9.93084C14.2375 9.50584 14.4642 9.02418 14.8892 8.88251C16.2492 8.38668 17.7508 8.38668 19.1108 8.88251C19.5358 9.03834 19.7625 9.50584 19.6067 9.93084Z" fill="#5B2867"/>
      </svg>,
        linkName:"Practice",
        color:"#ECD7F7",
        link:"/practice"
      },
      
    ]
    const content=[
        {
            className:"cards1",
            title:"Students Enrolled",
            icon:<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M12.9812 3.26792L5.20541 8.34417C2.71249 9.97167 2.71249 13.6142 5.20541 15.2417L12.9812 20.3179C14.3762 21.235 16.6754 21.235 18.0704 20.3179L25.8075 15.2417C28.2875 13.6142 28.2875 9.98458 25.8075 8.35708L18.0704 3.28083C16.6754 2.35083 14.3762 2.35083 12.9812 3.26792Z" stroke="#380F43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.27207 16.895L7.25916 22.9529C7.25916 24.5933 8.52499 26.35 10.075 26.8667L14.1954 28.2358C14.9058 28.4683 16.0812 28.4683 16.8046 28.2358L20.925 26.8667C22.475 26.35 23.7408 24.5933 23.7408 22.9529V16.9596" stroke="#380F43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.6417 19.375V11.625" stroke="#380F43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>,
            number:'100',
            doodle:<svg xmlns="http://www.w3.org/2000/svg" width="190" height="137" viewBox="0 0 190 137" fill="none">
            <path d="M-32 74.0311C-32 74.0311 -17.6431 72.5146 -8.57556 74.0311C0.491963 75.5476 4.2701 76.3059 10.3151 78.5807C16.3601 80.8555 22.4051 83.8885 22.4051 83.8885L32.9839 89.1964C32.9839 89.1964 42.8071 96.779 46.5852 101.329C50.3633 105.878 50.3633 108.911 54.1415 114.977C57.9196 121.043 63.209 126.351 63.209 126.351L76.8103 136.209L89.656 140L104.768 137.725L114.592 133.176L125.926 124.835L133.482 117.252L144.817 109.669L155.396 101.329L171.264 89.1964L185.621 78.5807L196.199 62.6572L203 42.9423V23.2275L185.621 14.1283C185.621 14.1283 173.531 10.337 166.73 10.337C159.929 10.337 156.907 9.57874 150.862 10.337C144.817 11.0953 136.108 14.1283 133.482 18.6779C130.857 23.2275 125.926 37.6345 125.926 37.6345C125.926 37.6345 122.148 49.0084 122.148 57.3493C122.148 65.6902 121.392 66.4485 122.148 74.0311C122.904 81.6137 122.904 79.3389 125.926 83.8885C128.949 88.4381 130.46 89.1964 133.482 92.2294C136.505 95.2625 144.817 101.329 144.817 101.329L158.418 114.977L171.264 124.835" stroke="#9A40B9" stroke-opacity="0.39" stroke-width="20" stroke-linecap="round"/>
          </svg>
        },
        {
            className:"cards2",
            title:"Courses Available",
            icon:<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M28.4167 21.6225V6.03209C28.4167 4.48209 27.1508 3.3325 25.6138 3.46167H25.5363C22.8238 3.69417 18.7033 5.07626 16.4042 6.52292L16.1846 6.665C15.81 6.8975 15.19 6.8975 14.8154 6.665L14.4925 6.47126C12.1933 5.03751 8.08584 3.66834 5.37334 3.44875C3.83625 3.31959 2.58334 4.48209 2.58334 6.01917V21.6225C2.58334 22.8625 3.59084 24.025 4.83084 24.18L5.20542 24.2317C8.00834 24.6063 12.3354 26.0271 14.8154 27.3833L14.8671 27.4092C15.2158 27.6029 15.7713 27.6029 16.1071 27.4092C18.5871 26.04 22.9271 24.6063 25.7429 24.2317L26.1692 24.18C27.4092 24.025 28.4167 22.8625 28.4167 21.6225Z" stroke="#12273F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.5 7.09125V26.4662" stroke="#12273F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0104 10.9662H7.10416" stroke="#12273F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.9792 14.8412H7.10416" stroke="#12273F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>,
            number:50,
            doodle:<svg xmlns="http://www.w3.org/2000/svg" width="190" height="132" viewBox="0 0 190 132" fill="none">
            <path d="M-15.7735 10.4109C-15.7735 10.4109 -2.58183 16.276 4.51261 22.1232C11.6071 27.9703 14.4999 30.516 18.5976 35.5085C22.6954 40.5011 26.414 46.1503 26.414 46.1503L32.9215 56.0364C32.9215 56.0364 37.6373 67.5147 38.6345 73.3438C39.6317 79.173 38.1151 81.7997 38.3541 88.9421C38.593 96.0846 40.5198 103.326 40.5198 103.326L47.3701 118.663L56.5991 128.37L70.8244 133.956L81.6063 134.927L95.5926 133.371L105.928 130.583L119.535 129.683L132.867 127.749L152.675 125.176L170.417 123.161L187.54 114.66L203.287 100.987L213.144 83.9137L202.643 67.3439C202.643 67.3439 194.068 58.0155 188.179 54.6152C182.289 51.2149 180.051 49.0469 174.436 46.6811C168.822 44.3153 159.763 42.5875 155.215 45.2148C150.666 47.8422 139.193 57.8536 139.193 57.8536C139.193 57.8536 130.234 65.8146 126.063 73.038C121.893 80.2615 120.859 80.5403 117.722 87.4849C114.586 94.4295 115.723 92.4594 116.066 97.9107C116.408 103.362 117.338 104.774 118.439 108.912C119.54 113.05 123.705 122.46 123.705 122.46L128.66 141.08L134.856 156.04" stroke="#2472BA" stroke-opacity="0.39" stroke-width="20" stroke-linecap="round"/>
          </svg>
        },
        {
            className:"cards3",
            title:"Sellable Courses",
            icon:<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M15.5 23.5083C18.3535 23.5083 20.6667 21.1951 20.6667 18.3417C20.6667 15.4882 18.3535 13.175 15.5 13.175C12.6465 13.175 10.3333 15.4882 10.3333 18.3417C10.3333 21.1951 12.6465 23.5083 15.5 23.5083Z" stroke="#450A0E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.485 18.4708L14.3246 19.3104C14.57 19.5558 14.9704 19.5558 15.2158 19.3233L17.515 17.205" stroke="#450A0E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.3333 28.4167H20.6667C25.8592 28.4167 26.7892 26.3371 27.0604 23.8054L28.0292 13.4721C28.3779 10.3204 27.4737 7.75 21.9583 7.75H9.04167C3.52625 7.75 2.62208 10.3204 2.97083 13.4721L3.93958 23.8054C4.21083 26.3371 5.14083 28.4167 10.3333 28.4167Z" stroke="#450A0E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.3333 7.75V6.71667C10.3333 4.43042 10.3333 2.58334 14.4667 2.58334H16.5333C20.6667 2.58334 20.6667 4.43042 20.6667 6.71667V7.75" stroke="#450A0E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.9646 14.2083C25.73 15.8358 23.25 16.9725 20.6796 17.6183" stroke="#450A0E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.38416 14.5571C5.54124 16.0296 7.89207 17.0758 10.3333 17.67" stroke="#450A0E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>,
            number:10,
            doodle:<svg xmlns="http://www.w3.org/2000/svg" width="190" height="139" viewBox="0 0 190 139" fill="none">
            <path d="M-15.7162 175.885C-15.7162 175.885 -4.19097 167.191 4.36249 163.821C12.9159 160.451 16.545 159.155 22.8982 157.991C29.2514 156.828 35.9951 156.314 35.9951 156.314L47.7966 155.415C47.7966 155.415 60.122 156.856 65.7037 158.81C71.2854 160.763 72.8476 163.363 79.2104 166.617C85.5731 169.871 92.8408 171.696 92.8408 171.696L109.576 173.141L122.54 169.774L134.322 160.041L140.399 151.082L145.819 138.095L148.39 127.703L154.2 115.366L158.972 102.768L166.326 84.196L173.164 67.7022L174.031 48.6046L169.706 28.2031L159.552 11.3042L139.969 12.4558C139.969 12.4558 127.653 15.4328 121.824 18.9354C115.994 22.438 113.013 23.3447 108.222 27.1081C103.431 30.8715 97.5281 37.9568 97.6209 43.2087C97.7136 48.4607 100.907 63.3494 100.907 63.3494C100.907 63.3494 103.527 75.0447 107.823 82.1942C112.119 89.3438 111.861 90.3829 116.414 96.4933C120.967 102.604 119.796 100.654 124.73 102.997C129.664 105.34 131.35 105.212 135.503 106.255C139.656 107.298 149.905 108.217 149.905 108.217L168.593 112.911L184.681 114.744" stroke="#EE4551" stroke-opacity="0.39" stroke-width="20" stroke-linecap="round"/>
          </svg>
        },
        {
            className:"cards4",
            title:"Grade Holders",
            icon:<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M5.5025 14.2342V20.6538C5.5025 23.0046 5.5025 23.0046 7.72417 24.5029L13.8338 28.0292C14.7508 28.5588 16.2492 28.5588 17.1663 28.0292L23.2758 24.5029C25.4975 23.0046 25.4975 23.0046 25.4975 20.6538V14.2342C25.4975 11.8833 25.4975 11.8833 23.2758 10.385L17.1663 6.85875C16.2492 6.32917 14.7508 6.32917 13.8338 6.85875L7.72417 10.385C5.5025 11.8833 5.5025 11.8833 5.5025 14.2342Z" stroke="#380F43" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.6042 9.85542V6.45834C22.6042 3.875 21.3125 2.58334 18.7292 2.58334H12.2708C9.6875 2.58334 8.39583 3.875 8.39583 6.45834V9.765" stroke="#380F43" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.3137 14.1954L17.05 15.345C17.1662 15.5258 17.4246 15.7067 17.6183 15.7583L18.9358 16.0942C19.7496 16.3008 19.9692 16.9983 19.4396 17.6442L18.5742 18.6904C18.445 18.8583 18.3417 19.1554 18.3546 19.3621L18.4321 20.7183C18.4837 21.5579 17.8896 21.9842 17.1146 21.6742L15.8488 21.1704C15.655 21.0929 15.3321 21.0929 15.1383 21.1704L13.8725 21.6742C13.0975 21.9842 12.5033 21.545 12.555 20.7183L12.6325 19.3621C12.6454 19.1554 12.5421 18.8454 12.4129 18.6904L11.5475 17.6442C11.0179 16.9983 11.2375 16.3008 12.0512 16.0942L13.3688 15.7583C13.5754 15.7067 13.8337 15.5129 13.9371 15.345L14.6733 14.1954C15.1383 13.4979 15.8617 13.4979 16.3137 14.1954Z" stroke="#380F43" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>,
            number:5,
            doodle:<svg xmlns="http://www.w3.org/2000/svg" width="190" height="95" viewBox="0 0 190 95" fill="none">
            <path d="M187.742 10.5474C187.742 10.5474 176.067 19.0392 167.456 22.2596C158.845 25.4801 155.194 26.7125 148.822 27.7649C142.449 28.8174 135.697 29.2132 135.697 29.2132L123.882 29.9059C123.882 29.9059 111.584 28.2507 106.037 26.1997C100.49 24.1487 98.9736 21.522 92.6686 18.1577C86.3636 14.7934 79.1289 12.8413 79.1289 12.8413L62.4212 11.1052L49.4008 14.2447L37.4504 23.771L31.2181 32.6226L25.5726 45.5132L22.82 55.8581L16.7955 68.0921L11.8044 80.6049L4.1283 99.0458L-2.99731 115.418L-4.19704 134.497L-0.229152 154.971L9.62827 172.045L29.2289 171.235C29.2289 171.235 41.5948 168.473 47.4843 165.073C53.3739 161.673 56.3706 160.818 61.2266 157.139C66.0826 153.46 72.1083 146.479 72.1071 141.226C72.106 135.973 69.1728 121.031 69.1728 121.031C69.1728 121.031 66.7578 109.292 62.5873 102.068C58.4169 94.8448 58.6921 93.8103 54.2464 87.6214C49.8007 81.4324 50.9381 83.4025 46.0458 80.9737C41.1534 78.5449 39.4655 78.6439 35.3314 77.5284C31.1973 76.4129 20.9659 75.3155 20.9659 75.3155L2.36249 70.296L-13.6909 68.182" stroke="#9A40B9" stroke-opacity="0.39" stroke-width="20" stroke-linecap="round"/>
          </svg>
        }
    ];
  return (
    <div className='Dashboard'>
        <img className='Navbutton' src={NavButton} alt="" />
        <h2 className='Message'>👋 Welcome in , Simjo V Geroge</h2>
        <h1 className='Title'>Dashboard</h1>
        <div className='SearchButton'><img className='SearchIcon' src={SearchButton} alt="" /></div>
        <div className='Cards'>
            {content.map((con)=>(
                <Cards 
                className={con.className}
                title={con.title}
                icon={con.icon}
                number={con.number}
                doodle={con.doodle}
                />
            ))}
        </div>
        <div className='section'>
            <h1 className='Title-2'>Section</h1>
            <div className='sections'>
            {links.map((link)=>(
              <Sections
              icon={link.icon}
              link={link.link}
              linkName={link.linkName}
              bgColor={link.color}
              />
            ))}
            </div>

        </div>
        
        <Footer/>
       
    </div>
  )
}

export default Dashboard
