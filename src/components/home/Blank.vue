<template>
  <section class="info">
    <div class="container">
      <section class="info__inner">
        <div class="info__column">
          <div class="info__photo">
            <img :src="avatar" alt="user photo" />
          </div>
        </div>
        <div class="info__body">
          <div class="info__block">
            <p class="info__block-title">{{ user_labels.title }}</p>
            <div class="info__field">
              <span class="form__label">{{ user_labels.surname }}</span>
              <span class="form__input">{{ user.last_name }}</span>
            </div>
            <div class="info__field">
              <span class="form__label">{{ user_labels.name }}</span>
              <span class="form__input">{{ user.first_name }}</span>
            </div>
            <div class="info__field">
              <span class="form__label">{{ user_labels.occupation }}</span>
              <span class="form__input">{{ employment }}</span>
            </div>
            <div class="info__field">
              <span class="form__label">{{ user_labels.age }}</span>
              <span class="form__input">{{ user.age }}</span>
            </div>
          </div>

          <div class="info__block info__block--beer">
            <p class="info__block-title" @click="toggleBlock()">
              {{ beer_labels.title }}
              <svg
                class="info__block-arrow"
                :class="showOptions ? 'info__block-arrow--rotated' : ''"
                width="30"
                height="15"
              >
                <use xlink:href="#arrow-down"></use>
              </svg>
            </p>
            <slide-up-down :active="showOptions" v-bind:class="{ show: show }">
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.name"></span>
                <span class="form__input" v-html="beer.name"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.style"></span>
                <span class="form__input" v-html="beer.style"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.brand"></span>
                <span class="form__input" v-html="beer.brand"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.hop"></span>
                <span class="form__input" v-html="beer.hop"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.alcohol"></span>
                <span class="form__input" v-html="beer.alcohol"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.blg"></span>
                <span class="form__input" v-html="beer.blg"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.ibu"></span>
                <span class="form__input" v-html="beer.ibu"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.malts"></span>
                <span class="form__input" v-html="beer.malts"></span>
              </div>
              <div class="info__field">
                <span class="form__label" v-html="beer_labels.yeast"></span>
                <span class="form__input" v-html="beer.yeast"></span>
              </div>
            </slide-up-down>
          </div>
        </div>
      </section>
      <template v-if="preloader">
        <loader
          object="#efefef"
          color1="#ffffff"
          color2="#1a1725"
          size="5"
          speed="2"
          bg="#3E2F56"
          objectbg="#A299C5"
          opacity="80"
          name="circular"
        ></loader>
      </template>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Blank',
  data() {
    return {
      active: true,
      showOptions: false,
      duration: 500,
      show: false,
      beer: [],
      user: [],
      preloader: false,
      employment: '',
      avatar: '',
      user_labels: {
        age: 'Age:',
        surname: 'Lastname:',
        name: 'Name',
        occupation: 'Occupation:',
        title: 'User info'
      },
      beer_labels: {
        title: 'Beer choice',
        name: 'Beer:',
        style: 'Style:',
        brand: 'Brand:',
        hop: 'Hop',
        alcohol: 'Alcohol:',
        blg: 'Blg:',
        ibu: 'Ibu:',
        malts: 'Malts:',
        yeast: 'Yeast:'
      }
    }
  },
  computed: {},

  mounted() {
    this.getData()
  },
  methods: {
    getAge(dateString) {
      var today = new Date()
      if (dateString !== undefined) {
        var birthDate = new Date(dateString)
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        return age
      }
    },
    async getData() {
      this.preloader = true
      await this.getBeer()
      await this.getUser()
      setTimeout(() => {
        this.preloader = false
      }, 1000)
    },
    toggleBlock() {
      this.showOptions = !this.showOptions
    },
    async getBeer() {
      const responseBeer = await axios
        .get('https://random-data-api.com/api/beer/random_beer')
        .catch(function (error) {
          console.log(error)
          return error.response
        })

      if (responseBeer.data) {
        this.beer = responseBeer.data
      }
    },
    async getUser() {
      const responseUser = await axios
        .get('https://random-data-api.com/api/users/random_user')
        .catch(function (error) {
          console.log(error)
          return error.response
        })
      console.log(responseUser.data)
      if (responseUser.data) {
        this.user = responseUser.data
        this.employment = this.user.employment.title
        this.avatar = this.user.avatar.split('?')
        this.avatar.pop()
        this.avatar.join('')
        this.user.age = this.getAge(this.user.date_of_birth)
      }
    }
  }
}
</script>
