<script>
</script>

<template>
    <footer>
        <div class="wrapper">
            <div class="leftSection">
                <!-- logo -->
                <div class="logo">
                    <img src="../../pic/Dobby-removebg.jpg" alt="logo">
                </div>
                <!-- slogan -->
                <div class="slogan">
                    <h2>多比商城</h2>
                    <p>讓你的購物瞬間滿足</p>
                </div>
            </div>

            <div class="contact">
                <h2>聯絡方式</h2>
                <div class="email">
                    <i class="fa-solid fa-envelope"></i>
                    <p>dobbybuy@dobbysite.com</p>
                </div>
                <div class="phone">
                    <i class="fa-solid fa-phone"></i>
                    <p>01-2345678</p>
                </div>

            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
// footer{
//     width: 100vw;
//     height: 100px;
//     min-width: 1270px;
//     background-color: #E2C2B3;
//     font-size: 2rem;
//     display: flex;
//     justify-content: center;align-content: center;
// }


.wrapper {
    width: 100%;
    height: 180px;
    margin-top:50px ;
    background-color: #E2C2B3;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .leftSection {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
            height: 150px;

            img {
                width: 100%;
                height: 100%;
            }
        }


        .slogan {
            h2 {
                font-size: 26px;
            }

            p {
                font-size: 20px;
            }
        }
    }

    .contact {

        padding: 20px;

        h2 {
            font-size: 24px;
        }

        .email {
            display: flex;
            align-items: center;

            i {
                font-size: 20px;
                margin-right: 10px;
            }

            p {
                margin-top: 10px;
            }

        }

        .phone {
            display: flex;
            align-items: center;

            i {
                font-size: 20px;
                margin-right: 10px;
            }

            p {
                margin-top: 10px;
            }

        }


    }


}</style>