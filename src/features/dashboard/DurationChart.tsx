import styled from 'styled-components';
import type { BookingStaysAfterDateType } from '../../schemas/booking.schema';
import Heading from '../../ui/Heading';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import useDarkMode from '../../contexts/useDarkMode';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    fill: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    fill: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    fill: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    fill: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    fill: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    fill: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    fill: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    fill: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    fill: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    fill: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    fill: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    fill: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    fill: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    fill: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    fill: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    fill: '#7e22ce',
  },
];

type StartData = {
  duration: string;
  value: number;
  fill: string;
};

function prepareData(startData: StartData[], stays: BookingStaysAfterDateType[]): StartData[] {
  function getDurationLabel(num: number): string {
    if (num === 1) return '1 night';
    if (num === 2) return '2 nights';
    if (num === 3) return '3 nights';
    if (num <= 5) return '4-5 nights';
    if (num <= 7) return '6-7 nights';
    if (num <= 14) return '8-14 nights';
    if (num <= 21) return '15-21 nights';
    return '21+ nights';
  }

  return stays
    .reduce((arr, cur) => {
      const label = getDurationLabel(cur.numNights);
      return arr.map(obj => (obj.duration === label ? { ...obj, value: obj.value + 1 } : obj));
    }, startData)
    .filter(obj => obj.value > 0);
}

function DurationChart({ confirmedStays }: { confirmedStays: BookingStaysAfterDateType[] }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(startData, confirmedStays);

  const tooltipBackground = isDarkMode ? '#18212f' : '#fff';

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          />
          <Tooltip contentStyle={{ backgroundColor: tooltipBackground }} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
