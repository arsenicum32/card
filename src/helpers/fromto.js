import moment from 'moment'

const fromTo = (m,f)=> ({
  from: moment().subtract( (2-m) + 1, ['days', 'week', 'month'][f] ).unix()*1000,
  to: moment().unix()*1000
})

export default fromTo
