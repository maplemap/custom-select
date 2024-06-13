import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {CustomSelect} from '../custom-select';

const SELECT_LABEL = 'Select an option';
const OPTIONS = [
  {id: 1, value: 'Option 1'},
  {id: 1, value: 'Option 2'},
  {id: 1, value: 'Option 3'},
  {id: 1, value: 'Option 4'},
  {id: 1, value: 'Option 5'},
];

const getComponent = (props) => (
  <CustomSelect
    {...{
      options: OPTIONS,
      onChange: jest.fn(),
      ...props,
    }}
  />
);

describe('`CustomSelect` component', () => {
  it('should render component with `Select an option` label', () => {
    render(getComponent());

    expect(screen.getByText(SELECT_LABEL)).toBeInTheDocument();
  });

  describe('when select was selected with `Tab` key', () => {
    beforeEach(async () => {
      render(getComponent());
      await userEvent.tab();
    });

    it('should change select state to focus', async () => {
      expect(screen.getByText(SELECT_LABEL)).toHaveFocus();
    });

    describe('when `ArrowUp` key was clicked', () => {
      it('should open popup of select with items', async () => {
        await userEvent.keyboard('{arrowup}');

        expect(screen.getByText(OPTIONS[0].value)).toBeInTheDocument();
      });
    });

    describe('when `ArrowDown` key was clicked', () => {
      beforeEach(async () => {
        await userEvent.keyboard('{arrowdown}');
      });

      it('should open popup of select with items', async () => {
        expect(screen.getByText(OPTIONS[0].value)).toBeInTheDocument();
      });

      describe('when `Option 2` was chosen  with `ArrowDown` key', () => {
        beforeEach(async () => {
          await userEvent.keyboard('{arrowdown}');
        });

        describe('when `Enter` key was clicked', () => {
          beforeEach(async () => {
            await userEvent.keyboard('{enter}');
          });

          it('should close popup of select with items', () => {
            expect(
              screen.queryByText(OPTIONS[0].value),
            ).not.toBeInTheDocument();
          });

          it('should render `Option 2` as label of select', () => {
            expect(screen.getByText(OPTIONS[1].value)).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('when select was clicked', () => {
    beforeEach(async () => {
      render(getComponent());
      await userEvent.click(screen.getByText(SELECT_LABEL));
    });

    it('should open popup of select with items', async () => {
      expect(screen.getByText(OPTIONS[0].value)).toBeInTheDocument();
    });

    describe('when option `Option 4` was clicked', () => {
      beforeEach(async () => {
        await userEvent.hover(screen.getByText(OPTIONS[3].value));
        await userEvent.keyboard('{enter}');
      });

      it('should close popup of select with items', async () => {
        expect(screen.queryByText(OPTIONS[0].value)).not.toBeInTheDocument();
      });

      it('should render chosen label as label of select', () => {
        expect(screen.getByText(OPTIONS[3].value)).toBeInTheDocument();
      });
    });

    describe('when `Esc` key was clicked', () => {
      it('should close popup of select with items', async () => {
        await userEvent.keyboard('{Escape}');

        expect(screen.queryByText(OPTIONS[0].value)).not.toBeInTheDocument();
      });

      it('should change select state to focus', async () => {
        expect(screen.getByText(SELECT_LABEL)).toHaveFocus();
      });
    });
  });
});
