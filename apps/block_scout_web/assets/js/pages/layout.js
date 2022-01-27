import $ from 'jquery'

$(document).click(function (event) {
  const clickover = $(event.target)
  const _opened = $('.navbar-collapse').hasClass('show')
  if (_opened === true && $('.navbar').find(clickover).length < 1) {
    $('.navbar-toggler').click()
  }
})

const search = (value) => {
  if (value) {
    window.location.href = `/search?q=${value}`
  }
}

$(document).on('keyup', function (event) {
  if (event.key === '/') {
    $('.main-search-autocomplete').trigger('focus')
  }
})

$('.main-search-autocomplete').on('keyup', function (event) {
  if (event.key === 'Enter') {
    let selected = false
    $('li[id^="autoComplete_result_"]').each(function () {
      if ($(this).attr('aria-selected')) {
        selected = true
      }
    })
    if (!selected) {
      search(event.target.value)
    }
  }
})

$('#search-icon').on('click', function (event) {
  const value = $('.main-search-autocomplete').val() || $('.main-search-autocomplete-mobile').val()
  search(value)
})

$('.main-search-autocomplete').on('focus', function (_event) {
  $('#slash-icon').hide()
  $('.search-control').addClass('focused-field')
})

$('.main-search-autocomplete').on('focusout', function (_event) {
  $('#slash-icon').show()
  $('.search-control').removeClass('focused-field')
})

$( document ).ready(function() {
  const networkgraph = document.querySelector('.dashboard-banner-network-graph')
  if (networkgraph) {
    networkgraph.style.display = 'none'
  }

  // console.log( "document loaded" );
  // block transactions page
  const url = location.href.toLowerCase()

  if (url.indexOf('/block') > 0 && url.indexOf('/transactions') > 0) {
    const txList = document.querySelector('[data-selector="token-transfers-toggle"]').querySelectorAll('[data-test="token_transfer"]')
    for (let j = 0; j < txList.length; j++){
      const addrList = txList[j].querySelectorAll('[data-address-hash]')
      if (addrList.length > 1 && addrList[1].getAttribute('data-address-hash') === '0x4200000000000000000000000000000000000011'){
        // get gas
        const gas = txList[j].querySelector('[data-test="token_link"]').parentNode.innerText
        txList[j].closest('[data-selector="token-transfers-toggle"]').querySelector('span[data-role="tx-fee"]').innerHTML = gas.split(' ')[0]

        const open = txList[j].closest('[data-selector="token-transfers-toggle"]').querySelector('[data-selector="token-transfer-open"]')
        if (open) {
          open.click()
        }

        txList[j].style.display = 'none'
      }
    }
  }

  // transaction page
  if (url.indexOf('/tx/') > 0) {
    const txList = document.querySelector('.transfers-list-mobile-container').querySelectorAll('span[data-address-hash="0x4200000000000000000000000000000000000011"]')
    if (txList.length > 0) {
      const gas = txList[0].closest('tr').nextElementSibling.querySelector('[data-test="token_link"]').parentNode.innerText
      document.querySelector('span[data-role="tx-fee"]').innerHTML = gas.split(' ')[0]
      txList[0].closest('tr').style.display = 'none'
      txList[0].closest('tr').nextElementSibling.style.display = 'none'
      txList[0].closest('tr').previousElementSibling.style.display = 'none'
    }
  }

  // dashboard & txs
  if (document.querySelector('.dashboard-banner-container') || url.indexOf('/txs') > 0) {
    function updateTxs() {
      const txs = document.querySelectorAll('div[data-test="token-transfer"]');
      for (let i = 0; i < txs.length; i++) {
        const txList = txs[i].querySelectorAll('[data-test="token_transfer"]')
        for (let j = 0; j < txList.length; j++){
          const addrList = txList[j].querySelectorAll('[data-address-hash]')
          if (addrList.length > 1 && addrList[1].getAttribute('data-address-hash') === '0x4200000000000000000000000000000000000011'){
            // get gas
            const gas = txList[j].querySelector('[data-test="token_link"]').parentNode.innerText
            txList[j].closest('[data-test="token-transfer"]').querySelector('span[data-role="tx-fee"]').innerHTML = gas.split(' ')[0]
  
            if (!txList[j].getAttribute('metis-mark')) {
              const open = txList[j].closest('[data-test="token-transfer"]').querySelector('[data-selector="token-transfers-toggle"]').querySelector('[data-selector="token-transfer-open"]')
              if (open) {
                open.click()
              }
      
              txList[j].style.display = 'none'
              txList[j].setAttribute('metis-mark', '1')
            }
          }
        }
      }
    }
    setTimeout(()=>{
      updateTxs()
    }, 100)
    setInterval(()=>{
      updateTxs()
    }, 3000)
  }
});
