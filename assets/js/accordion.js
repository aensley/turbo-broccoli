/* global $, $content */

(function () {
  const $h2s = $content.find('h2')
  const h2Num = $h2s.length
  // Accordion ID
  const accordionId = 'contentAccordion'
  // Accordion root element.
  const $accordion = $('<div class="accordion" id="' + accordionId + '"/>')
  // Loop through H2s
  for (let i = 0; i < h2Num; i++) {
    let $h2 = $h2s.eq(i)
    // Remove the (now) unnecessary child anchor element.
    $h2.find('.heading-anchor').remove()
    // Find the next H2 if there is one.
    let $nextH2 = (i === (h2Num - 1) ? null : $h2s.eq(i + 1))
    // Create a single Accordion section.
    let $card = $(
      '<div class="card">' +
        '<div class="card-header" id="heading' + i + '"><h2 class="m-0" id="' + $h2.attr('id') + '">' +
            '<button class="btn btn-lg btn-link" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">' +
              $h2.text() +
            '</button>' +
          '</h2>' +
        '</div>' +
        '<div id="collapse' + i + '" class="collapse' + (i === 0 ? ' show' : '') + '" aria-labelledby="heading' + i + '" data-parent="#' + accordionId + '">' +
          '<div class="card-body"></div>' +
        '</div>' +
      '</div>'
    )
    let $cardBody = $card.find('.card-body')
    // Add accordion section content.
    $cardBody.append('<h2>' + $h2.text() + '</h2>')
    // This grabs everything from the current H2 until the next one,
    // or everything until the end of the containing element if there is no $nextH2.
    // It also removes it from the DOM while retaining all event listeners and properties.
    $cardBody.append($h2.nextUntil($nextH2).detach())
    // Put the accordion section in the accordion.
    $accordion.append($card)
    // Remove the H2 from the DOM.
    $h2.remove()
  }

  // Put the accordion on the page.
  $content.append($accordion)
})()
