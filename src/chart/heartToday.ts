const array: number[] = [];
const currentHour: number = new Date().getHours();
const labelArray: string[] = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
  '12 AM',
]

for (let i: number = 0; i <= currentHour; i++) {
  array.push(getRandomNumber(70, 100))
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const datasets = () => ({
  labels: labelArray,
  datasets: [
    {
      label: '',
      backgroundColor: 'rgb(243, 5, 148)',
      borderColor: 'rgb(243, 5, 148)',
      lineTension: 0.4,
      data: array
    }
  ]
})

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: function(context){
        const {chart, tooltip} = context
        const tooltipEl = getOrCreateTooltip(chart)

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0
          return
        }

        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || []
          const bodyLines = tooltip.body.map(b => b.lines)

          const tableHead = document.createElement('thead')

          titleLines.forEach(title => {
            const tr = document.createElement('tr')
            tr.style.borderWidth = 0

            const th = document.createElement('th')
            th.style.borderWidth = 0
            th.style.textAlign = 'left'
            const text = document.createTextNode(title)

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      // const span = document.createElement('span');
      // span.style.background = colors.backgroundColor;
      // span.style.borderColor = colors.borderColor;
      // span.style.borderWidth = '2px';
      // span.style.marginRight = '10px';
      // span.style.height = '20px';
      // span.style.width = '20px';
      // span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body + " bpm");

      td.style.fontSize = '20px'
      td.style.margin = 0

      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1
      tooltipEl.style.left = positionX + tooltip.caretX + 'px'
      tooltipEl.style.top = positionY 
      tooltipEl.style.font = tooltip.options.bodyFont.string
      tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
      }
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        callback: function(value, index, ticks){
          if (index % 3 != 0){
            return ''
          }
          return labelArray[index]
        }
      },
      grid: {
        display: true,
        color: 'rgba(200,200,200,0.3)'
      }
    },
    y: {
      beginAtZero: false,
      min: 60,
      max: 120,
      grid: {
        display: false,
      },
    },
  }
}

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(255, 255, 255, 0.5)';
    tooltipEl.style.color = 'black';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};
